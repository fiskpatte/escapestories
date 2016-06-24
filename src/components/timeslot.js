import React from 'react';

class Timeslot extends React.Component {

  render() {
    var bookButtonStyle = {
        backgroundColor: '#4CAF50',
        border: 'none',
        color: 'white',
        webkitBorderRadius: '12px',
        padding: '5px 10px'
    }
    return (
      <div>
      {typeof this.props.slot == 'undefined' ? "" :
        this.props.slot.breakin == "open" ||
          this.props.slot.manuscript == "open" ||
          this.props.slot.coverup == "open"
          ? <button style={bookButtonStyle}>Boka</button>
          : "Fullt"
         }
      </div>
    );
  }
}
export default Timeslot;
