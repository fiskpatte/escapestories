import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Timeslot from './timeslot';
import Form from './form';

var database = firebase.database();
var calendarRef = database.ref('calendar');
var slotsRef = database.ref('days');
var firstDateOfWeek = new Date();
var currentWeek;
var todaysDateAsString;

Date.prototype.getWeek = function() {
  var weekday = (6+this.getDay())%7;
  // Hämta veckodag för 1 januari
  var jan1 = new Date(this.getFullYear(),0,1);
  var jan1day = (6+jan1.getDay())%7;
  // Hämta måndag i vecka 1
  if (jan1day <= 3){
    var firstmonday = new Date(this.getFullYear(), 0, 1-jan1day);
  }
  else{
    var firstmonday = new Date(this.getFullYear(), 0, 8-jan1day);
  }
  // Hämta måndag i aktuell vecka
  var thismonday = new Date(this);
  thismonday.setDate(this.getDate()-weekday);
  // Kolla om det är slutet av december och vecka 1
  if (thismonday.getDate() > 28 && thismonday.getMonth() == 11){
    return 1;
  }
  var week = Math.floor( ( thismonday - firstmonday ) / 86400000 / 7 ) + 1;
  if (week == 0){
    week = new Date(this.getFullYear()-1,11,31).getWeek();
  }
  return week;
}

class Calendar extends React.Component {

  constructor(props){
    super(props);
    // jag vill ha en array i state som innehåller alla noder för vald vecka.
    this.state = {timeSlots: [
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""},
                    {date: "", data: {}, dbId: "", readableDate: ""}
                  ],
                  showbreakin: true,
                  showcoverup: true,
                  showmanuscript: true,
                  test: "hej"
                  };

    var todaysDate = new Date();
    todaysDateAsString = this.convertDateToDbString(todaysDate);
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
      var i = 0;
      for(var index in cal){
        // Kolla om denna dag ska läggas till
        if(index >= self.convertDateToDbString(weekArray[0]) && index <= self.convertDateToDbString(weekArray[6])){
          // if(index == todaysDateAsString){
          //   self.setActiveClass(i);
          // }
          newTimeSlots.push({
            date: index,
            dbId: cal[index],
            data: {},
            readableDate: self.convertToReadableDay(index)
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
          i++;
        }
      }

      var newState = self.state;
      newState.timeSlots = newTimeSlots;
      newState.weeksFirstDate = firstDateOfWeek;
      self.setState(newState);
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

  componentWillUnmount(){
    slotsRef.off();
    slotsRef.off();
    slotsRef.off();
    calendarRef.off();
    calendarRef.off();
    calendarRef.off();
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
  // Töm hela databasen innan du kör den här, annars kommer det bli konstigt
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


  navigateToPrevWeek(){
    var self = this;
    firstDateOfWeek = this.addDaysAndReturnNewDate(firstDateOfWeek, -7);
    var weekArray = this.getWeekArray(firstDateOfWeek);
    var todaysDate = new Date();
    todaysDateAsString = this.convertDateToDbString(todaysDate);

    calendarRef.on("value", function(snapshot){
      var cal = snapshot.val();
      var firstDateOfWeekAsString = self.convertDateToDbString(firstDateOfWeek);
      var newTimeSlots = [];
      var otherWeek = true;
      var i = 0;
      for(var index in cal){
        // Kolla om denna dag ska läggas till
        if(index >= self.convertDateToDbString(weekArray[0]) && index <= self.convertDateToDbString(weekArray[6])){
          // if(index == todaysDateAsString){
          //   self.setActiveClass(i);
          //   otherWeek = false;
          // }
          newTimeSlots.push({
            date: index,
            dbId: cal[index],
            data: {},
            readableDate: self.convertToReadableDay(index)
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
          i++;
        }
      }
      // if(otherWeek == true){
      //   self.removeActiveClass();
      // }
      // Checka att det fanns data för hela veckan
      if(newTimeSlots.length == 7){
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
      } else {
        console.log("Slut på datum");
        // korrigera första datum för aktuell vecka
        firstDateOfWeek = self.addDaysAndReturnNewDate(firstDateOfWeek, 7);
      }
    });
  }

  navigateToNextWeek(){
    var self = this;
    firstDateOfWeek = this.addDaysAndReturnNewDate(firstDateOfWeek, 7);
    var weekArray = this.getWeekArray(firstDateOfWeek);
    var todaysDate = new Date();
    todaysDateAsString = this.convertDateToDbString(todaysDate);

    calendarRef.on("value", function(snapshot){
      var cal = snapshot.val();
      var firstDateOfWeekAsString = self.convertDateToDbString(firstDateOfWeek);
      var newTimeSlots = [];
      var otherWeek = true;
      var i = 0;
      for(var index in cal){
        // Kolla om denna dag ska läggas till
        if(index >= self.convertDateToDbString(weekArray[0]) && index <= self.convertDateToDbString(weekArray[6])){
          // if(index == todaysDateAsString){
          //   self.setActiveClass(i);
          //   otherWeek = false;
          // }
          newTimeSlots.push({
            date: index,
            dbId: cal[index],
            data: {},
            readableDate: self.convertToReadableDay(index)
          });
          if(index == self.convertDateToDbString(weekArray[6])){
            break;
          }
          i++;
        }
      }
      // if(otherWeek == true){
      //   self.removeActiveClass();
      // }
      // Checka att det fanns data för hela veckan
      if(newTimeSlots.length == 7){
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
      } else {
        console.log("Slut på datum");
        // korrigera första datum för aktuell vecka
        firstDateOfWeek = self.addDaysAndReturnNewDate(firstDateOfWeek, -7);
      }
    });
  }

  bookRoomButtonCallback(slot, id, time){
    // Denna länk ska vi använda för att skapa bokingsinterfacet:
    // http://stackoverflow.com/questions/4396790/html-css-pop-up-window-and-disabled-background

    var slotToUpdate;
    for(var i in this.state.timeSlots){
      if(this.state.timeSlots[i].dbId == id){
        console.log(id);
        slotToUpdate = this.state.timeSlots[i];
        break;
      }
    }
    var availableRooms = [];
    if(slotToUpdate.data[time].breakin == 'open'){
      availableRooms.push('breakin');
    }
    if(slotToUpdate.data[time].manuscript == 'open'){
      availableRooms.push('manuscript');
    }
    if(slotToUpdate.data[time].coverup == 'open'){
      availableRooms.push('coverup');
    }

    if(availableRooms.length > 0) {
      browserHistory.push("/avsluta/" + id + "/" + time);
    }
    else {
      console.error("Error vid bokning. dayId: "+ id + ", time: " + time);
    }
  }

  convertToReadableDay(date){
    var month;
    switch(date.substr(2,2)){
      case "01":
        month = "jan";
        break;
      case "02":
        month = "feb";
        break;
      case "03":
        month = "mar";
        break;
      case "04":
        month = "apr";
        break;
      case "05":
        month = "maj";
        break;
      case "06":
        month = "jun";
        break;
      case "07":
        month = "jul";
        break;
      case "08":
        month = "aug";
        break;
      case "09":
        month = "sep";
        break;
      case "10":
        month = "okt";
        break;
      case "11":
        month = "nov";
        break;
      case "12":
        month = "dec";
        break;
    }
    var day = date.substr(4,2);
    if(day[0] == '0'){
      day = day.substr(1,1);
    }
    return day + " " + month;

  }

  toggleRoom(room){
    console.log(this.state["test"]);
    switch(room){
      case "breakin":
        $("#breakinImg").toggleClass("black-and-white");
        $("#breakinImg").toggleClass("shiny");
        break;
      case "coverup":
        $("#coverupImg").toggleClass("black-and-white");
        $("#coverupImg").toggleClass("shiny");
        break;
      case "manuscript":
        $("#manuscriptImg").toggleClass("black-and-white");
        $("#manuscriptImg").toggleClass("shiny");
        break;
    }

    var newState = this.state;
    newState["show" + room] = newState["show" + room] == true ? false : true;
    this.setState(newState);
  }

  render() {
    return (
      <div className="shrink-to-fit table-container content">
        <div>
          <img id="manuscriptImg" className="round shiny" src="manuscript.png" onClick={this.toggleRoom.bind(this, "manuscript")}/>
          <img id="coverupImg"    className="round shiny" src="coverup.png" onClick={this.toggleRoom.bind(this, "coverup")}/>
          <img id="breakinImg"    className="round shiny" src="breakin.png" onClick={this.toggleRoom.bind(this, "breakin")}/>
        </div>
        {/*<button onClick={this.generateTimeslotsForOneMonthButtonClicked.bind(this)}>Generera timeslots för 1 månad framåt</button>*/}
        <div className="flex">
          <button className="fa fa-arrow-left calendar-button" onClick={this.navigateToPrevWeek.bind(this)}></button>
          <p className="week-number-p">Vecka {firstDateOfWeek.getWeek()}</p>

          <button className="fa fa-arrow-right calendar-button" onClick={this.navigateToNextWeek.bind(this)}></button>
        </div>
        <table className="calendar-table hoverTable">
          <tbody>
            <tr className="calendar-first-row">
              <td id="td-mon" className="calendar-first-row-td">Måndag <span><br></br></span>{this.state.timeSlots[0].readableDate}</td>
              <td id="td-tue" className="calendar-first-row-td">Tisdag <span><br></br></span>{this.state.timeSlots[1].readableDate}</td>
              <td id="td-wed" className="calendar-first-row-td">Onsdag <span><br></br></span>{this.state.timeSlots[2].readableDate}</td>
              <td id="td-thu" className="calendar-first-row-td">Torsdag<span><br></br></span>{this.state.timeSlots[3].readableDate}</td>
              <td id="td-fri" className="calendar-first-row-td">Fredag <span><br></br></span>{this.state.timeSlots[4].readableDate}</td>
              <td id="td-sat" className="calendar-first-row-td">Lördag <span><br></br></span>{this.state.timeSlots[5].readableDate}</td>
              <td id="td-sun" className="calendar-first-row-td">Söndag <span><br></br></span>{this.state.timeSlots[6].readableDate}</td>
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["0900"] }
                                                                    dayId={day.dbId}
                                                                    time="0900"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)}  /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1030"]}
                                                                    dayId={day.dbId}
                                                                    time="1030"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)}  /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1200"]}
                                                                    dayId={day.dbId}
                                                                    time="1200"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1330"]}
                                                                    dayId={day.dbId}
                                                                    time="1330"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1500"]}
                                                                    dayId={day.dbId}
                                                                    time="1500"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1630"]}
                                                                    dayId={day.dbId}
                                                                    time="1630"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1800"]}
                                                                    dayId={day.dbId}
                                                                    time="1800"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["1930"]}
                                                                    dayId={day.dbId}
                                                                    time="1930"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
            <tr className="calendar-tr">
              {this.state.timeSlots.map((day, index) => (
                <td className="calendar-td" key={index}>{<Timeslot  slot={day.data["2100"]}
                                                                    dayId={day.dbId}
                                                                    time="2100"
                                                                    showcoverup={this.state.showcoverup}
                                                                    showbreakin={this.state.showbreakin}
                                                                    showmanuscript={this.state.showmanuscript}
                                                                    bookCallback={this.bookRoomButtonCallback.bind(this)} /> }</td>
              ))}
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
export default Calendar;
