import React from 'react';

import RoomChoise from './roomchoise';

var database = firebase.database();
var slotRef;
var bookingsRef = database.ref('bookings');
var time;
var slot;

class Form extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;
        time = this.props.params.time;
        slot = this.props.params.slot;
        this.state = {availableRooms : [], activeRoom: "" };
        slotRef = database.ref('days').child(slot).child(time);
    }

    componentDidMount(){
      time = this.props.params.time;
      slot = this.props.params.slot;
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
        // Detta kan ske mellan att användaren klickar på "BOKA"
        // i kalendern och att man fullföljer sin bokning.
        if(openSlots.length == 0){
          // En fin popup som säger att det sista rummet hann bli bokat.
          // browserHistory.push(/boka);
        }
        // Kollar om det val man gjort blivit taget, men det fortfarande finns
        // något annat rum ledigt.
        else if($.inArray(self.state.activeRoom, openSlots) == -1){
          // Byt aktivt rum till första bästa.
          newRoom = openSlots[0];
          newState.activeRoom = newRoom;
        }

        newState.availableRooms = openSlots;
        self.setState(newState);
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
      var newState = this.state;
      newState.ost = "DET FUNKAR";
      this.setState(newState);
    }

    chooseRoomCallback(room){
      var newState = this.state;
      newState.activeRoom = room;
      this.setState(newState);
    }

    render() {
      return (
        <div className="content">
          <form id="bookForm">
            <p>this.state.activeRoom: {this.state.activeRoom}</p>
            <div className="">

              {this.state.availableRooms.map((room, index) => (
                <div key={index} className="menu-choise-div fit-childs">
                  <img  id={"id"+room}
                        className="room-image rounded-5-perc"
                        src={"../../" + room + ".png"}
                        onClick={this.chooseRoomCallback.bind(this, room)} />
                  <br></br>
                  <p>Room: {room}</p>
                </div>
              ))}




            </div>
            <br></br>
            <input id="nameinput" className="form-control rounded-edges" type="text" placeholder="Namn" />
            <br></br>
            <input id="emailinput" className="form-control rounded-edges" type="email" placeholder="Email" />
            <br></br>
            <input id="teleinput" className="form-control rounded-edges" type="tel" placeholder="Telefonnummer" />
            <br></br>
            <input id="couponinput" className="form-control rounded-edges" type="text" placeholder="Rabattkod (Valfri)" />
            <br></br><br></br>
            <select name="numberOfPeople" className="form-control pull-right width-fifty bigger-font selectBox">
              <option value="3">3 pers - 750 kr</option>
              <option value="3">4 pers - 1000 kr</option>
              <option value="3">5 pers - 1250 kr</option>
              <option value="3">6 pers - 1500 kr</option>
            </select>
            <br></br>
            <br></br>
            <span><button type="button" onClick={this.backButtonClicked.bind(this)}>Tillbaka</button><button className="pull-right" type="button" onClick={this.submit.bind(this)}>Boka</button></span>
          </form>
        </div>
      );
    }
}
export default Form;
