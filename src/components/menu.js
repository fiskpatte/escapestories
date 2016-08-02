import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class Menu extends React.Component {
  logoClick() {
      $('.list-text li.active').removeClass('active');
      browserHistory.push("/");
  }

  navigateToHome(){
    browserHistory.push("/");
  }

  navigateToBooking(){
    browserHistory.push("/boka");
  }

  navigateToHowToPlay(){
    browserHistory.push("/howtoplay");
  }

  navigateToAbout(){
    browserHistory.push("/about");
  }

  render() {
      return (
        <div>
            <nav className="navbar navbar-default navbar-fixed-top nav-background">
                <div className="container-fluid navbar-layout">
                    <div className="navbar-header">
                        <img onClick={this.logoClick.bind(this)}
                             src="logo.png" 
                             className="brand-logo navbar-brand image-cursor"></img>
                        <button type="button"
                                className="navbar-toggle"
                                data-target="#nct"
                                data-toggle="collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div id="nct" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav rounded-border list-margin list-text">
                            <li onClick={this.navigateToHome.bind(this)}><a data-toggle="tab" className="nav-link glyphs glyphicon glyphicon-home" href="#"></a></li>
                            <li onClick={this.navigateToBooking.bind(this)}><a data-toggle="tab" className="nav-link glyphs glyphicon glyphicon-calendar" href="#"></a></li>
                            <li onClick={this.navigateToHowToPlay.bind(this)}><a data-toggle="tab" className="nav-link" href="#">Hur spelar man?</a></li>
                            <li onClick={this.navigateToAbout.bind(this)}><a data-toggle="tab" className="nav-link" href="#">Om oss</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {this.props.children}
        </div>
      );
  }
}

export default Menu;
