import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

class Menu extends React.Component {



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
            <nav className="navbar navbar-default nav-background">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img onClick={this.navigateToHome.bind(this)} 
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
                        <ul className="nav navbar-nav">
                            <li onClick={this.navigateToHome.bind(this)}><a data-toggle="tab" className="nav-link" href="#">Hem</a></li>
                            <li onClick={this.navigateToBooking.bind(this)}><a data-toggle="tab" className="nav-link" href="#">Bokning</a></li>
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
