import React from 'react';

class Form extends React.Component {
    constructor(props){
        super(props);
        var rooms = this.props.availableRooms;
    }

    render() {
        return (
            <form>
                <select>
                    {
                        this.props.availableRooms.map(function(room) {
                            return <option value={room}>{room}</option>;
                        })
                    }
                </select>
                <br>
                    
                <input type="text" id="name"></input>
            </form>
    );
    }
}
export default Form;
