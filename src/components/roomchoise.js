import React from 'react';

class RoomChoise extends React.Component {
  constructor(props){
    super(props);
    var source = "../../";
    source += this.props.room;
    source += ".png";
    console.log("this.props.room: "+this.props.room);
    this.state = {room: this.props.room, imgsource: source};
  }

  render() {
    return (
      <div className="menu-choise-div fit-childs">
        <img className="rounded-10-perc shiny" src={this.state.imgsource}/>
        <br></br>

        <i className="fa fa-check center-object big-green" aria-hidden="true"></i>
        <br></br>

      </div>
    );
  }
}

export default RoomChoise;
