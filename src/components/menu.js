import React from 'react';

class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default nav-background">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <img src="logo.png" className="brand-logo navbar-brand"></img>
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
                            <li><a data-toggle="tab" className="nav-link" href="#">Hem</a></li>
                            <li className="active"><a data-toggle="tab" className="nav-link" href="#">Bokning</a></li>
                            <li><a data-toggle="tab" className="nav-link" href="#">Hur spelar man?</a></li>
                            <li><a data-toggle="tab" className="nav-link" href="#">Om oss</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Menu;
