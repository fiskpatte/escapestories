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
      <div className="fit-childs">
        <img className="round shiny" src={this.state.imgsource}/>        
      </div>
    );
  }
}

export default RoomChoise;
