import React from 'react';

class Timeslot extends React.Component {
  render() {
    return (
      <p>{typeof this.props.slot == 'undefined' ? "TimeSlot" : this.props.slot}</p>
    );
  }
}
export default Timeslot;
