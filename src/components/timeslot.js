import React from 'react';

class Timeslot extends React.Component {
  
  render() {
    return (
      <p>{typeof this.props.slot == 'undefined' ? "undefined" : this.props.slot.breakin}</p>
    );
  }
}
export default Timeslot;
