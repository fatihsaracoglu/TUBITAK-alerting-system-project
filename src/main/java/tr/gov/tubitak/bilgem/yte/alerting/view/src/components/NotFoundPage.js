import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import bg404 from '../assets/bg404.png';

class NotFoundPage extends React.Component {
    render(){
        return <div className="pageNotFound">
            <img src={bg404} alt="404" />
            <div className="text">
                <h1>404</h1>
                <p>Opps... Page not found.</p>
                <Link to="/"><Button variant="warning">Go to Home</Button></Link>
            </div>
        </div>;
    }
}

export default NotFoundPage;
