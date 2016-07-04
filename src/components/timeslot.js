import React from 'react';

class Timeslot extends React.Component {



  constructor(props){
    super(props);
    var t = this.props.time;
    t = this.addDots(t);
    this.state = {buttonText : t};
  }

  addDots(theTime){
    var formattedTime = "";
    formattedTime += theTime.substr(0,2);
    formattedTime += ':';
    formattedTime += theTime.substr(2, 4);
    return formattedTime;
  }
  callParent(){
    var slot = this.props.slot;
    var id= this.props.dayId;
    var time = this.props.time;
    var self = this;
    this.props.bookCallback(slot, id, time);
  }

  mouseEnter(){
    var newState = this.state;
    newState.buttonText = "Boka!";
    this.setState(newState);
  }

  mouseLeave(){
    var newState = this.state;
    var t = this.props.time;
    t = this.addDots(t);
    newState.buttonText = t;
    this.setState(newState);
  }

  render() {
    return (
      <div className="td-div">
      {typeof this.props.slot == 'undefined' ? "" :
        this.props.slot.breakin == "open" ||
          this.props.slot.manuscript == "open" ||
          this.props.slot.coverup == "open"
          ? <button className="timeslot-button"
                    onClick={this.callParent.bind(this)}
                    onMouseEnter={this.mouseEnter.bind(this)}
                    onMouseLeave={this.mouseLeave.bind(this)}>
                    {this.state.buttonText}
            </button>
          : <div className="full-slot-div"></div>
         }
      </div>
    );
  }
}
export default Timeslot;
