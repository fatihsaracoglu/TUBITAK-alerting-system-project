import React from 'react';
import Button from 'react-bootstrap/Button';

class Notification extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <Button variant="warning" onClick={this.props.closePopup}>OK</Button>
                </div>
            </div>
        );
    }
}

export default Notification;
