import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Notification from './Notification';
import axios from 'axios';


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

        this.fetchAlert();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    validate = () => {
        let nameError = "";
        let urlError = "";
        let periodError = "";
        var regex;
        var result;

        if(!this.state.name) {
            nameError = "Name cannot be blank!";
        }

        if(!this.state.url) {
            urlError = "URL cannot be blank!";
        } else {
            regex = /^((https?):\/\/)?(www.|[a-zA-Z]+\.)?[a-zA-Z0-9]+\.[a-zA-Z]+\.[a-zA-Z]+(\/[a-zA-Z0-9-_#]+\/?)*$/;
            result = regex.test(this.state.url);
            if (result === false)
                urlError = "Enter a valid URL!"
        }

        if(!this.state.period) {
            periodError = "Period cannot be blank!";
        } else {
            regex = /^\d+$/;
            result = regex.test(this.state.period);
            if (result === false)
                periodError = "Enter an integer!"
        }

        if (nameError || urlError || periodError) {
            this.setState({nameError, urlError, periodError});
            return false;
        }

        return true;
    };

    handleUpdate = event => {
        const isValid = this.validate();
        if (isValid) {
            this.putAlert();
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

    putAlert = () => {
        axios.put("http://localhost:8080/alerts/" + this.props.match.params.id, {
            name: this.state.name,
            url: this.state.url,
            method: this.state.method,
            period: this.state.period,
        });
    };

    fetchAlert = () => {
        axios.get("http://localhost:8080/alerts/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    url: res.data.url,
                    method: res.data.method,
                    period: res.data.period,
                });
            })
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
                                        value={this.state.period}
                                        onChange={this.handleInputChange}
                                        name="period"
                                        id="period"
                                        placeholder="Enter a period (second)"
                                    />
                                </Form.Group>
                            </Form>
                            <ButtonToolbar>
                                <Button
                                    onClick={() => {this.handleUpdate(); this.togglePopup()}}
                                    variant="warning"
                                >
                                    Update
                                </Button>
                                {this.state.showPopup ?
                                    <Notification
                                        text='Alert Updated!'
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
