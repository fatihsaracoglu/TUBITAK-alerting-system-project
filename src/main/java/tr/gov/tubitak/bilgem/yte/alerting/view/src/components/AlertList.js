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

        this.goBack = this.goBack.bind(this);
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

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const contents = this.state.alertList.map((item, key) => {
            return (
                <tr key={key}>
                    <th scope="row">{item.name}</th>
                    <th><Link to={{pathname: "/alerts/" + item.id}}>
                        {item.url}
                    </Link>
                    </th>
                    <th>{item.period}</th>
                    <th><Button onClick={() => this.handleDelete(item.id)} id="delete-btn" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </Button></th>
                </tr>
            );
        });

        return (
            <div className="AlertList">
                <Link to="/"><Button variant="warning" className="back-btn previous round">&#8249;</Button></Link>
                {/* <div className="text">ALERT LIST</div> */}
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
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
