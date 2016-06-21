import React from 'react';
import Timeslot from './timeslot';

var database = firebase.database();
var calendarRef = database.ref('calendar');
var myWeekObject;

class Calendar extends React.Component {

  constructor(props){
    super(props);
    // jag vill ha en array i state som innehåller alla noder för vald vecka.
    this.state = {timeSlots: [{date: ""}, {date: ""}, {date: ""}, {date: ""}, {date: ""}, {date: ""}, {date: ""}]};

    var todaysDate = new Date();
    var currentWeekDay = todaysDate.getDay();

    var firstDateOfWeek = this.addDaysAndReturnNewDate(todaysDate, 1 - currentWeekDay);
    // Gör en array där alla datum jag vill komma åt finns.
    var weekArray = this.getWeekArray(firstDateOfWeek);
    var self = this;

    calendarRef.on("value", function(snapshot){

      var cal = snapshot.val();
      var firstDateOfWeekAsString = self.convertDateToDbString(firstDateOfWeek);

      var newTimeSlots = [];
      for(var index in cal){
        // Kolla om denna dag ska läggas till
        if(index >= self.convertDateToDbString(weekArray[0]) && index <= self.convertDateToDbString(weekArray[6])){
          newTimeSlots.push({
            date: index,
            data: cal[index]
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
        }
      }
      // gå igenom de aktuella datumen.

      var newState = self.state;
      newState.timeSlots = newTimeSlots;
      self.setState(newState);

    });
  }

  componentDidMount(){
      // var todaysDate = new Date();
      // var currentWeekDay = todaysDate.getDay();
      // console.log(currentWeekDay);
      //
      // var firstDateOfWeek = this.addDaysAndReturnNewDate(todaysDate, 1 - currentWeekDay);
      // // Gör en array där alla datum jag vill komma åt finns.
      // var weekArray = this.getWeekArray(firstDateOfWeek);

  }

  // Return arrays of dates given a first date
  getWeekArray(firstDate){
    var weekArray = [];
    for(var i = 0; i < 7; i++){
      weekArray.push(this.addDaysAndReturnNewDate(firstDate, i));
    }
    return weekArray;
  }

  // Adds a number of days to a date and returns the new date.
  addDaysAndReturnNewDate(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // skapa lite tider i databasen
  generateTimeslotsForOneMonthButtonClicked(){
    var todaysDate = new Date();
    // för att få med hela förra veckan
    var earlierDate = this.addDaysAndReturnNewDate(todaysDate, -15);
    var tempDate;
    var tempDateAsString;
    for(var i = 0; i < 65; i++){
      tempDate = this.addDaysAndReturnNewDate(earlierDate, i);
      tempDateAsString = this.convertDateToDbString(tempDate);
      database.ref('calendar/' + tempDateAsString).set({
        "0900" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1030" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1200" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1330" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1500" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1630" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1800" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "1930" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        },
        "2100" : {
          "manuscript" : "open",
          "coverup" : "open",
          "breakin" : "open"
        }
      });
    }
  }

  convertDateToDbString(date){
    var dateAsValidString = "";
    dateAsValidString += date.getFullYear().toString().substring(2, 4);
    var month = date.getMonth();
    month += 1;
    if(month < 10){
      month = "0" + month;
    }
    dateAsValidString += month;
    var day = date.getDate();
    if(day < 10){
      day = "0" + day;
    }
    dateAsValidString += day;
    return dateAsValidString;
  }

  render() {
    return (
      <div>
        {/*<button onClick={this.generateTimeslotsForOneMonthButtonClicked.bind(this)}>Generera timeslots för 1 månad framåt</button>*/}
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>{this.state.timeSlots[0].date}</td>
              <td>{this.state.timeSlots[1].date}</td>
              <td>{this.state.timeSlots[2].date}</td>
              <td>{this.state.timeSlots[3].date}</td>
              <td>{this.state.timeSlots[4].date}</td>
              <td>{this.state.timeSlots[5].date}</td>
              <td>{this.state.timeSlots[6].date}</td>
            </tr>
            <tr>
              <td>09:00</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>10:30</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>12:00</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>13:30</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>15:00</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>16:30</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>18:00</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>19:30</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
            <tr>
              <td>21:00</td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
              <td><Timeslot /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Calendar;
