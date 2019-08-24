import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';


class AlertList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertList: [],
        };
    }

    fetchAlerts = () => {
        axios.get('http://localhost:8080/alerts')
            .then(res => {
                this.setState({alertList: res.data})
            })
            .catch(err => console.log(err))
    };

    handleDelete(id){
        axios.delete('http://localhost:8080/alerts/' + id);
    }

    componentDidUpdate = () => {
        this.fetchAlerts();
    };

    componentDidMount() {
        this.fetchAlerts();
    };

    render() {
        const contents = this.state.alertList.map((item, key) => {
            return (
                <tr key={key}>
                    <th>
                        <Link to={{pathname: "/alerts/update/" + item.id}}><button type="button" className="btn btn-sm btn-outline-warning">Update</button></Link>
                    </th>
                    <th>
                        <Link to={{pathname: "/alerts/" + item.id}}><button type="button" className="btn btn-sm btn-outline-warning">Detail</button></Link>
                    </th>
                    <th className="row-element" scope="row">{item.name}</th>
                    <th className="row-element">
                        {item.url}
                    </th>
                    <th className="row-element">{item.method}</th>
                    <th className="row-element">{item.period}</th>
                    <th><Button onClick={() => this.handleDelete(item.id)} id="delete-btn" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Button></th>
                </tr>
            );
        });

        return (
            <div className="AlertList">
                <Link to="/"><Button variant="warning" className="back-btn previous round">&#8249;</Button></Link>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Method</th>
                        <th scope="col" className="period">Period</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{contents}</tbody>
                </table>
            </div>
        );
    }
}

export default AlertList;
