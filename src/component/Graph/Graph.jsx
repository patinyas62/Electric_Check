import React, { Component } from 'react'
import Calendar from 'react-calendar'
import './Graph.scss' 
import axios from 'axios';
import {Line} from "react-chartjs-2"
export default class Graph extends Component {

    constructor(props){
        super(props)
        this.state = {
            date1: new Date(),
            date2: new Date()
        }
    }

    isEmpty(obj) {
        // tslint:disable-next-line: forin
        // tslint:disable-next-line: prefer-const
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
    }

    componentDidMount() {
        this.receivedData()
    }

    receivedData() {
        axios.get(`https://smart-factory.xeus.dev/data/desc`).then(async res => {
                const data = res.data;
                let check_data = [];
                for (let i = 0; i < data.data.length; i++) {
                    var  local_save = [];
                    for (let j = 0; j < data.data[i].result.appliance.length; j++) {
                      if (!this.isEmpty(data.data[i].result.appliance[j])) {
                        await local_save.push(data.data[i].result.appliance[j]);
                      }
                    }
                    data.data[i].result.appliance = local_save;
                    await check_data.push(data.data[i]);
                }

                const slice = check_data.slice()

                var pass = [];
                var fail = [];
                var day = []
                var o = 0
                var l = 0

                for (let index = 0; index < slice.length; index++) {
                    if (slice[index].result.overallResult === "Passed") {
                        o += 1
                    }
                    else{
                        l += 2
                    }
                    let po = slice[index].result.date.split(" ")
                    if (index === 0) {
                        day.push(po)
                    } else {
                        let po2 = day
                        if (po[0] !== po2[po2.length - 1]) {
                            pass.push(o)
                            fail.push(l)
                            day.push(po[0])
                        }
                    }
                    
                }
                const daa = {
                    labels: day,
                    datasets: [
                      {
                        label: 'PASSED',
                        data: fail,
                        fill: false,
                        backgroundColor: '#009A06',
                        borderColor: '#009A06',
                      },
                      {
                        label: 'FAILED',
                        data: pass,
                        fill: false,
                        backgroundColor: '#CE0000',
                        borderColor: '#CE0000',
                      }
                    ],
                  };
        
                  const options = {
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  };
                
                this.setState({
                    data: daa,
                    option: options
                })
        })
    }

    render() {
        return (
            <div className="body_history">
                <h1>GRAPH</h1>
                    <div className="over_all history">
                        <div className="header">
                            <p>From</p>
                            <p className="date_history">{this.state.date1.getDate() + "/" + (parseInt(this.state.date1.getMonth()) + 1)+ "/" + this.state.date1.getFullYear()}</p>
                            <p>TO</p>
                            <p className="date_history">{this.state.date2.getDate() + "/" + (parseInt(this.state.date2.getMonth()) + 1)+ "/" + this.state.date2.getFullYear()}</p>
                            <p className="liney">|</p>
                            <p className="search_history">SERACH</p>
                        </div>
                        
                        {this.state.checkDate1? <Calendar
                                onChange={()=>{}}
                                value={new Date()}
                            />:null}
                        {this.state.checkDate2? <Calendar
                                onChange={()=>{}}
                                value={new Date()}
                            />:null}
                        {this.state.postData}
                    </div>
                    <div className="graph">
                        <Line width="45vw" height="30vh" data={this.state.data} options={this.state.options} />
                    </div>
            </div>
        )
    }
}
