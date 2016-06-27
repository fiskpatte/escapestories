import React from 'react';
import Timeslot from './timeslot';

var database = firebase.database();
var calendarRef = database.ref('calendar');
var slotsRef = database.ref('days');
var myWeekObject;
var firstDateOfWeek = new Date();

class Calendar extends React.Component {

  constructor(props){
    super(props);
    // jag vill ha en array i state som innehåller alla noder för vald vecka.
    this.state = {timeSlots: [
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""},
                    {date: "", data: {}, dbId: ""}
                  ]

                  };

    var todaysDate = new Date();
    var currentWeekDay = todaysDate.getDay();

    // temporärt hack
    if(currentWeekDay == 0){
      currentWeekDay = 7;
    }
    firstDateOfWeek = this.addDaysAndReturnNewDate(todaysDate, 1 - currentWeekDay);
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
            dbId: cal[index],
            data: {}
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
        }
      }

      var newState = self.state;
      newState.timeSlots = newTimeSlots;
      newState.weeksFirstDate = firstDateOfWeek;
      self.setState(newState);


      // gå igenom de aktuella datumen.
    });
  }

  componentDidMount(){
      var self = this;
      slotsRef.on("value", function(snapshot){
        // för varje nod i newTimeSlots, lägg till data
        var snap = snapshot.val();
        var newTimeSlots = self.state.timeSlots;
        for(var day in self.state.timeSlots){
          newTimeSlots[day].data = snap[newTimeSlots[day].dbId];
        }
        var newState = self.state;
        newState.timeSlots = newTimeSlots;
        self.setState(newState);
      });

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
      var dayId = database.ref('days').push({
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
      database.ref('calendar/' + tempDateAsString).set(dayId.key);
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

  navigateToNextWeek(){
    var self = this;
    firstDateOfWeek = this.addDaysAndReturnNewDate(firstDateOfWeek, 7);
    var weekArray = this.getWeekArray(firstDateOfWeek);
    
    calendarRef.on("value", function(snapshot){
      var cal = snapshot.val();
      var firstDateOfWeekAsString = self.convertDateToDbString(firstDateOfWeek);
      var newTimeSlots = [];
      for(var index in cal){
        // Kolla om denna dag ska läggas till
        if(index >= self.convertDateToDbString(weekArray[0]) && index <= self.convertDateToDbString(weekArray[6])){
          newTimeSlots.push({
            date: index,
            dbId: cal[index],
            data: {}
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
        }
      }

      slotsRef.on("value", function(snapshot){
        // för varje nod i newTimeSlots, lägg till data
        var snap = snapshot.val();
        //var newTimeSlots = self.state.timeSlots;
        for(var day in newTimeSlots){
          newTimeSlots[day].data = snap[newTimeSlots[day].dbId];
        }

        var newState = self.state;
        newState.timeSlots = newTimeSlots;
        newState.weeksFirstDate = firstDateOfWeek;
        self.setState(newState);
      });
    });
  }

  render() {
    return (
      <div className="shrink-to-fit">
        {/*<button onClick={this.generateTimeslotsForOneMonthButtonClicked.bind(this)}>Generera timeslots för 1 månad framåt</button>*/}
        <div>
          <button className="fa fa-arrow-left calendar-button"></button>
          <button className="fa fa-arrow-right calendar-button calendar-button-right" onClick={this.navigateToNextWeek.bind(this)}></button>
        </div>
        <table className="calendar-table">
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
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["0900"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>10:30</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1030"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>12:00</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1200"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>13:30</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1330"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>15:00</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1500"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>16:30</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1630"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>18:00</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1800"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>19:30</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["1930"]} /> }</td>
              ))}
            </tr>
            <tr>
              <td>21:00</td>
              {this.state.timeSlots.map((day, index) => (
                <td key={index}>{<Timeslot slot={day.data["2100"]} /> }</td>
              ))}
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
export default Calendar;
