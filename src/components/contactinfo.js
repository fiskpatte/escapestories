import React from 'react';

class Contactinfo extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;
    }

    render() {
        return (
            <div className="content">
                <div className="contactinfo-description">
                    <h1>Vilka är vi?</h1>
                    <p>Fantastiska rum är endast en del av pusselbiten. God kundservice är nyckeln till en oförglömlig upplevelse, och våra GameMasters är här så att vi kan garantera detta.</p>
                </div>

                <div className="row image-row">
                    <div className="col-sm-6 col-md-3">
                        <img src="melody.jpg" className="employee-image"/>
                        <div className="employee-info">
                            <h4>Miss Melody</h4>
                            <p>aka ClueQueen</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <img src="fredrik.jpg" className="employee-image"/>
                        <div className="employee-info">
                            <h4>Fredrik</h4>
                            <p>aka Mister Fox</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <img src="meron.jpg" className="employee-image"/>
                        <div className="employee-info">
                            <h4>Meron</h4>
                            <p>aka The Time Keeper</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <img src="patrik.jpg" className="employee-image"/>
                        <div className="employee-info">
                            <h4>Patrik</h4>
                            <p>aka Babyface</p>
                        </div>
                    </div>
                </div>
            </div>
          );
    }
}
export default Contactinfo;
