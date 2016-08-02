import React from 'react';

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
        this.state = {availableRooms : [] };
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

        var newState = self.state;
        newState.availableRooms = openSlots;
        self.setState(newState);
      });
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

    render() {
      return (
        <div className="content">
          <form id="bookForm">
            {this.state.availableRooms.map((room, index) => (
              <span key={index}><input type="radio" name="room" value={room} /> {room} </span>
            ))}
            <br></br>
            <input id="nameinput" className="form-control rounded-edges" type="text" placeholder="Namn" />
            <br></br>
            <input id="emailinput" className="form-control rounded-edges" type="email" placeholder="Email" />
            <br></br>
            <input id="teleinput" className="form-control rounded-edges" type="tel" placeholder="Telefonnummer" />
            <br></br>
            <input id="couponinput" className="form-control rounded-edges" type="text" placeholder="Rabattkod (Valfri)" />
            <br></br>
            <select name="numberOfPeople" className="pull-right width-fifty bigger-font rounded-edges">
              <option value="3">3 pers - 750 kr</option>
              <option value="3">4 pers - 1000 kr</option>
              <option value="3">5 pers - 1250 kr</option>
              <option value="3">6 pers - 1500 kr</option>
            </select>
            <br></br>
            <br></br>
            <span><button type="button">Tillbaka</button><button className="pull-right" type="button" onClick={this.submit.bind(this)}>Boka</button></span>
          </form>
        </div>
      );
    }
}
export default Form;
