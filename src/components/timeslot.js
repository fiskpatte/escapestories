import React from 'react';

class Timeslot extends React.Component {

  callParent(){
    var slot = this.props.slot;
    var id= this.props.dayId;
    var time = this.props.time;
    this.props.bookCallback(slot, id, time);
  }
  render() {
    return (
      <div className="td-div">
      {typeof this.props.slot == 'undefined' ? "" :
        this.props.slot.breakin == "open" ||
          this.props.slot.manuscript == "open" ||
          this.props.slot.coverup == "open"
          ? <button className="timeslot-button" onClick={this.callParent.bind(this)}>Boka</button>
        : <div className="full-slot-div"></div>
         }
      </div>
    );
  }
}
export default Timeslot;
