import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import Notification from './Notification';


class AlertForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "https://",
            method: "GET",
            period: 0,
            showPopup: false,
            nameError: "",
            urlError: "",
            periodError: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    validate = () => {
        let nameError = "";
        let urlError = "";
        let periodError = "";

        if(!this.state.name) {
            nameError = "Name cannot be blank!";
        }

        if(!this.state.url) {
            urlError = "URL cannot be blank!";
        }

        if(!this.state.period) {
            periodError = "Period cannot be blank!";
        }

        if (nameError || urlError || periodError) {
            this.setState({nameError, urlError, periodError});
            return false;
        }

        return true;
    };


    handleSubmit = event => {
        //event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            const data = this.state;
            console.log(data);
            this.post();
            this.setState({
                nameError: "",
                urlError: "",
                periodError: ""
            });
        }
    };

    togglePopup = () => {
        const isValid = this.validate();
        if(isValid) {
            this.setState({
                showPopup: !this.state.showPopup,
            });

        }
    };

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    post = () => {
        axios.post("http://localhost:8080/alerts", {
            name: this.state.name,
            url: this.state.url,
            method: this.state.method,
            period: this.state.period,
        });
    };

    render() {
        return (
            <div className="Form" onSubmit={this.handleSubmit}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={6}>
                            <Form className="form-block">
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        name="name"
                                        id="name"
                                        placeholder="Enter a name"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>URL</Form.Label>
                                    <Form.Control
                                        value={this.state.url}
                                        onChange={this.handleInputChange}
                                        name="url"
                                        id="url"
                                        placeholder="www.example.com"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>HTTP Method</Form.Label>
                                    <Form.Control
                                        value={this.state.method}
                                        onChange={this.handleInputChange}
                                        name="method"
                                        id="method"
                                        as="select"
                                    >
                                        <option>GET</option>
                                        <option>POST</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Period</Form.Label>
                                    <Form.Control
                                        value={this.state.time}
                                        onChange={this.handleInputChange}
                                        name="period"
                                        id="period"
                                        placeholder="Enter a period (second)"
                                    />
                                </Form.Group>
                            </Form>
                            <ButtonToolbar>
                                <Button
                                    onClick={() => {this.handleSubmit(); this.togglePopup()}}
                                    variant="warning"
                                >
                                    Submit
                                </Button>
                                {this.state.showPopup ?
                                    <Notification
                                        text='Alert added!'
                                        closePopup={this.togglePopup.bind(this)}
                                    />
                                    : null
                                }
                                <Button
                                    onClick={() => {
                                        this.props.history.push('/alerts')
                                    }}
                                    variant="warning"
                                    className="alert-list-btn">
                                    Alert List
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <div id="errors">
                            <div id="nameError">{this.state.nameError}</div>
                            <div id="urlError">{this.state.urlError}</div>
                            <div id="periodError">{this.state.periodError}</div>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AlertForm;
