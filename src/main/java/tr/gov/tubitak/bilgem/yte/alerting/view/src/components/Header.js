import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/alert-logo.png';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Navbar className="fixed-top">
                    <Navbar.Brand href="/">
                        <img
                            alt="alert-logo"
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {" Alerting System"}
                    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default Header;
