import React from 'react';

class RoomChoise extends React.Component {
  constructor(props){
    super(props);
    var source = "../../";
    source += this.props.room;
    source += ".png";
    var iAmIndexZero = this.props.index == 0 ? true : false;

    this.state = {room: this.props.room,
                  imgsource: source,
                  active: (this.props.myIndex == this.props.activeRoom),
                  myIndex: this.props.myIndex};

    console.log(this.props.myIndex + " kör konstruktorn.")
  }

  componentDidMount(){
    if(this.state.active){
      $("#id"+this.state.myIndex).addClass("shiny");
    } else {
      $("#id"+this.state.myIndex).addClass("black-and-white");
    }
  }

  componentWillReceiveProps(nextProps){
    var oldActive = this.state.active;
    var newState = this.state;
    newState.active = nextProps.activeRoom == this.state.myIndex;
    var newActive = newState.active;
    this.setState(newState);
    if(oldActive != newActive){
      $("#id"+this.state.myIndex).toggleClass("black-and-white");
      $("#id"+this.state.myIndex).toggleClass("shiny");
    }
  }

  focusOnMe(){
    if(!this.state.active){
      this.props.pickMeCallback(this.state.myIndex);
    }
  }

  render() {
    return (
      <div className="menu-choise-div fit-childs">
        <img  id={"id"+this.props.myIndex}
              className="room-image rounded-5-perc"
              src={this.state.imgsource}
              onClick={this.focusOnMe.bind(this, this.state.myIndex)} />
        <br></br>
        <p>Index: {this.state.myIndex}</p>

      </div>
    );
  }
}



export default RoomChoise;
