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
        this.state = {availableRooms : [], activeRoom: 0 };
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

    backButtonClicked(){
      var newState = this.state;
      newState.ost = "DET FUNKAR";
      this.setState(newState);
    }

    chooseRoomCallback(index){
      var newState = this.state;
      newState.activeRoom = index;
      this.setState(newState);
      console.log("activeRoom: " + index);
    }

    render() {
      return (
        <div className="content">
          <form id="bookForm">
            <p>this.state.activeRoom: {this.state.activeRoom}</p>
            <div className="">
              {this.state.availableRooms.map((room, index) => (
                <div key={index}><RoomChoise  room={room}
                                              myIndex={index}
                                              activeRoom={this.state.activeRoom}
                                              pickMeCallback={this.chooseRoomCallback.bind(this)}  /></div>
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
