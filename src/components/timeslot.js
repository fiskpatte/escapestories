import React from 'react';

class Timeslot extends React.Component {

  render() {
    return (
      <div>
      {typeof this.props.slot == 'undefined' ? "" :
        this.props.slot.breakin == "open" ||
          this.props.slot.manuscript == "open" ||
          this.props.slot.coverup == "open"
          ? <button className="timeslot-button">Boka</button>
          : "Fullt"
         }
      </div>
    );
  }
}
export default Timeslot;
