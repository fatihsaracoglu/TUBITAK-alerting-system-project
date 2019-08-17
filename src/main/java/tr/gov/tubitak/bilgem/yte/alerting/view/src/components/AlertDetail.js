import React, {Component} from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [];
var xVal = 0;
var yVal = 0;

class AlertDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            url: '',
            method: '',
            period: '',
            status: '',
        };
        this.updateChart = this.updateChart.bind(this);
        this.fetchAlerts();
        // this.goBack = this.goBack.bind(this);
    }

    fetchAlerts = () => {
        axios.get("http://localhost:8080/alerts/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    url: res.data.url,
                    method: res.data.method,
                    period: res.data.period,
                    status: res.data.alertDetailSet[res.data.alertDetailSet.length - 1]
                });
                const interval = res.data.period * 1000;
                setInterval(this.updateAlert, interval);
                setInterval(this.updateChart, interval)
            })
    };

    updateAlert = () => {
        axios.get("http://localhost:8080/alerts/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    status: res.data.alertDetailSet[res.data.alertDetailSet.length - 1]
                });
            })
    };

    updateChart() {
        yVal = this.state.status.status;
        dps.push({x: xVal, y: yVal});
        xVal = xVal + this.state.period;
        if (dps.length > 10) {
            dps.shift();
        }
        this.chart.render();
    }

    // goBack() {
    //     this.props.history.goBack();
    // }


    render() {
        const options = {
            title: {
                text: "Website Status:  " + this.state.url,
                fontColor: "#F4BD24",
                fontWeight: "normal",
                fontSize: 20,
            },
            axisX: {
                title: "Time (s)",
                lineThickness: 2,
                lineColor: "#F4BD24",
                labelFontColor: "#F4BD24",
                titleFontColor: "#F4BD24"
            },
            axisY: {
                title: "Status",
                lineThickness: 2,
                lineColor: "#F4BD24",
                labelFontColor: "#F4BD24",
                titleFontColor: "#F4BD24"
            },
            data: [{
                type: "line",
                dataPoints: dps,
                lineColor: "white",
                markerColor: "#F4BD24",
            }],
            backgroundColor: "#161b21"
        };

        return (
            <div className="AlertDetail">
                <a href="/alerts"><Button variant="warning" className="back-btn previous round">&#8249;</Button></a>
                <div className="Chart">
                    <CanvasJSChart options={options}
                                   onRef={ref => this.chart = ref}
                    />
                </div>
            </div>
        );
    }
}

export default AlertDetail;
