import React from 'react';
import {IoLocationOutline} from "react-icons/io5";

import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div id="header">
        <div className="header_section">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="index.html"><img src="images/logo.png"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-link">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/vehicles" className="nav-link">Vehicles</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/client" className="nav-link">Client</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        </form>
                    </div>
                </nav>
            </div>
        </div>

        <div className="call_text_main">
            <div className="container">
                <div className="call_taital">
                    <div className="call_text"><a href="#">


                        <IoLocationOutline/>

                        <span className="padding_left_15">Location</span></a></div>
                    <div className="call_text"><a href="#"><i className="fa fa-phone" aria-hidden="true"></i><span
                        className="padding_left_15">(+71) 8522369417</span></a></div>
                    <div className="call_text"><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i><span
                        className="padding_left_15">demo@gmail.com</span></a></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Header;