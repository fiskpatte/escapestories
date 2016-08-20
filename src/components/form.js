import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';


var database = firebase.database();
var slotRef;
var bookingsRef = database.ref('bookings');

class Form extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;

        this.state = {availableRooms : [], activeRoom: "" };
        slotRef = database.ref('days').child(this.props.params.slot).child(this.props.params.time);
    }

    componentDidMount(){
      var self = this;
      slotRef.on("value", function(snapshot){
        var data = snapshot.val();
        var openSlots = [];
        for(var room in data){
          if(data[room] == "open"){
            openSlots.push(room);
          }
        }

        // Deklarerar häruppe för att få med newRoom
        var newState = self.state;
        var newRoom;
        // Kolla om det inte finns några lediga rum kvar.
        // Du har bytt hela innehållet i din kommentar. Nyss stod det "Förhoppningsvis kommer det vara över om två år", eller liknande. Du syftade naturligtvis på att SD då ska få så mycket inflytande att de stoppar tiggarna. Varför raderar du inte din kommentar och skriver en ny istället för att totakt redigera en som redan är besvarad?
        // Detta kan ske mellan att användaren klickar på "BOKA"
        // i kalendern och att man fullföljer sin bokning.
        if(openSlots.length == 0){
          // En fin popup som säger att det sista rummet hann bli bokat.
          //alert("Någon hann före. Hoppas det passar med en annan tid :)");
          //browserHistory.push("/boka");
          sweetAlert({
            title: 'Ooooops',
            text: "Någon hann före. Hoppas det passar med en annan tid :)",
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okej'
          },
          function(){
            browserHistory.push('/boka');
          });

        }
        // Kollar om det val man gjort blivit taget, men det fortfarande finns
        // något annat rum ledigt.
        else if($.inArray(self.state.activeRoom, openSlots) == -1){
          // Byt aktivt rum till första bästa.
          newRoom = openSlots[0];
          newState.activeRoom = newRoom;
          newState.availableRooms = openSlots;
          self.setState(newState);
        } else {
          newState.availableRooms = openSlots;
          self.setState(newState);
        }
      });
    }

    componentDidUpdate(prevProps, prevState){
      var activeRoom = prevState.activeRoom;
      if(activeRoom == "breakin"){
        $("#idbreakin").addClass("shiny");
        $("#idbreakin").removeClass("black-and-white");
        $("#idcoverup").addClass("black-and-white");
        $("#idcoverup").removeClass("shiny");
        $("#idmanuscript").addClass("black-and-white");
        $("#idmanuscript").removeClass("shiny");
      } else if(activeRoom == "coverup"){
        $("#idcoverup").addClass("shiny");
        $("#idcoverup").removeClass("black-and-white");
        $("#idbreakin").addClass("black-and-white");
        $("#idbreakin").removeClass("shiny");
        $("#idmanuscript").addClass("black-and-white");
        $("#idmanuscript").removeClass("shiny");
      } else if(activeRoom == "manuscript"){
        $("#idmanuscript").addClass("shiny");
        $("#idmanuscript").removeClass("black-and-white");
        $("#idbreakin").addClass("black-and-white");
        $("#idbreakin").removeClass("shiny");
        $("#idcoverup").addClass("black-and-white");
        $("#idcoverup").removeClass("shiny");
      }
    }

    componentWillUnmount(){
      slotRef.off();
      slotRef.off();
      bookingsRef.off();
    }

    submit(){
      var selectedRoom = $('input[name=room]:checked', '#bookForm').val();
      // lägg till kontaktuppgifterna i noden bookings.
      // peka på nyckeln i days-noden.
      var name = $("#nameinput").val();
      var email = $("#emailinput").val();
      var phonenumber = $("#teleinput").val();
      var coupon = $("#couponinput").val();

      var newBooking = bookingsRef.push();
      newBooking.set({
        "name" : name,
        "email" : email,
        "phonenumber" : phonenumber,
        "coupon" : coupon
      });
      slotRef.child(selectedRoom).set(newBooking.key);
      //browserHistory.push("/confirmation");
    }

    backButtonClicked(){
      browserHistory.push("/boka");
    }

    chooseRoomCallback(room){
      var newState = this.state;
      newState.activeRoom = room;
      this.setState(newState);
    }

    render() {
      return (
          <div>
          <form id="bookForm">
            <div className="min-width-600">
              <h4>Vänligen fyll i dina uppgifter för att slutföra bokningen</h4>
              <br></br>


            <input id="nameinput" className="form-control rounded-edges" type="text" placeholder="Namn" />
            <br></br>
            <br></br>
            <input id="emailinput" className="form-control rounded-edges" type="email" placeholder="Email" />
            <br></br>
            <br></br>
            <input id="teleinput" className="form-control rounded-edges" type="tel" placeholder="Telefonnummer" />
            <br></br>
            <br></br>
            <input id="couponinput" className="form-control rounded-edges" type="text" placeholder="Rabattkod (Valfri)" />
            <br></br>
            <br></br>
            <select name="numberOfPeople" className="form-control pull-right width-fifty bigger-font selectBox">
              <option value="3">3 pers - 750 kr</option>
              <option value="3">4 pers - 1000 kr</option>
              <option value="3">5 pers - 1250 kr</option>
              <option value="3">6 pers - 1500 kr</option>
            </select>
            <br></br>
            <h5>Välj ett rum:</h5>

            <div className="fit-childs center-object">
              {this.state.availableRooms.map((room, index) => (
                <div key={index} className="menu-choise-div fit-childs">
                  <img  id={"id"+room}
                        className="room-image rounded-5-perc"
                        src={"../../" + room + ".png"}
                        onClick={this.chooseRoomCallback.bind(this, room)} />
                  <br></br>
                </div>
              ))}
            </div>
          </div>
          <br></br>

            <div className="button-span">
              <span><button type="button" className="btn btn-primary btn-xlarge" onClick={this.backButtonClicked.bind(this)}>Tillbaka</button><button type="button" className="btn btn-success pull-right btn-xlarge" onClick={this.submit.bind(this)}>Boka!</button></span>
            </div>

          </form>
        </div>
      );
    }
}
export default Form;
