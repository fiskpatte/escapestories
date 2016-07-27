import React from 'react';

var database = firebase.database();
var slotsRef;

var time;
var slot;

class Form extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;
        time = this.props.params.time;
        slot = this.props.params.slot;
        console.log("slot: " + slot);
        console.log("time: " + time);
        this.state = {availableRooms : [] };
        slotsRef = database.ref('days').child(slot).child(time);
    }

    componentDidMount(){
      time = this.props.params.time;
      slot = this.props.params.slot;
      var self = this;
      slotsRef.on("value", function(snapshot){
        console.log("Men nu då");
        var data = snapshot.val();
        var openSlots = [];
        for(var i in data){
          if(data[i] == "open"){
            openSlots.push(i);
          }
        }

        var newState = self.state;
        newState.availableRooms = openSlots;
        self.setState(newState);
      });
    }

    render() {
      return (
        <form>
          {this.state.availableRooms.map((room, index) => (
            <span key={index}><input type="radio" name="room" value={room} /> {room} </span>

            ))

          }
        </form>
      );
    }
}
export default Form;
