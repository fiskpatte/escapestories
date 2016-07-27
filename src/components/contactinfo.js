import React from 'react';

class Contactinfo extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;
    }

    render() {
        return (
            <div>
              <p>Ring oss fan inte! rinka </p>
            </div>
          );
    }
}
export default Contactinfo;
