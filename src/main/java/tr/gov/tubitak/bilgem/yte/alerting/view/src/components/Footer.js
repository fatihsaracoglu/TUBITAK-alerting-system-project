import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class Footer extends Component {
    render() {
        return (
            <div className="fixed-bottom">
                <Navbar>
                    <Container>
                        <span dangerouslySetInnerHTML={{__html: "&copy;"}}/> All rights
                        reserved. Made by Fatih Saraçoğlu
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Footer;
