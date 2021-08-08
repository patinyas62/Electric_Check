import React, { Component } from 'react'
import './Dashboard.scss'

export default class Dashboard extends Component {

    constructor(props){
        super(props);
        console.log(props.location && props.location.state)
        this.state = {
            test_now: true,
            count: 20,
            data: [
                {id: 19283849848,date:'10/02/2012',test: 'fail',dc_ir: 'pass',hipot:"pass",power: "fail",earth:"pass"},
                {id: 20129192848,date:'11/02/2012',test: 'fail',dc_ir: 'pass',hipot:"pass",power: "fail",earth:"none"},
                {id: 39283339848,date:'12/02/2012',test: 'pass',dc_ir: 'pass',hipot:"pass",power: "pass",earth:'none'},
                {id: 43283849848,date:'13/02/2012',test: 'pass',dc_ir: 'pass',hipot:"pass",power: "fail",earth:'pass'}
            ]
        }
    }

    componentDidMount(){
        document.querySelector(".one_realtime").classList.add("pass")
    }

    _one_realtime = () =>{
        if(this.state.test_now === true){
            this.setState({
                test_now: false
            })
            document.querySelector(".one_realtime").classList.remove("pass")
            document.querySelector(".one_realtime").classList.add("fail")
        }else{
            this.setState({
                test_now: true
            })
            document.querySelector(".one_realtime").classList.remove("fail")
            document.querySelector(".one_realtime").classList.add("pass")
        }
    }

    _data = ((value,index) => {
        console.log(value.test)
        return (
            <div className={value.test === "pass" ? "detail box pass":"detail box fail"}>
                <div className={value.test === "pass" ? "front dens_pass":"front dens_fail"} ></div>
                    <div className="center_detail">
                    <p className="id">{value.id}</p>
                    <div className="children">
                        <p>{value.date}</p>
                        {value.dc_ir === "none"?<p>-</p>: value.dc_ir === "pass"?<p className="pass">PASS</p>: <p className="fail">FAIL</p>}
                        {value.hipot === "none"?<p>-</p>: value.hipot === "pass"?<p className="pass">PASS</p>: <p className="fail">FAIL</p>}
                        {value.power === "none"?<p>-</p>: value.power === "pass"?<p className="pass">PASS</p>: <p className="fail">FAIL</p>}
                        {value.earth === "none"?<p>-</p>: value.earth === "pass"?<p className="pass">PASS</p>: <p className="fail">FAIL</p>}
                    </div>
                </div>
            </div>
        )
    })

    render() {
        return (
            <div className="body">
                <div className="body_wrong">
                    <div className="heading">
                        <p>DASHBOARD</p>
                    </div>
                    <div className="show_head">
                        <div className="one_realtime box" onClick={this._one_realtime}>
                            <p>NOW</p>
                            {this.state.test_now ? <p className="pass">PASS</p> : <p className="fail">FAIL</p>}
                        </div>
                        <div className="today_pass box pass">
                            <p className="pass">PASS</p>
                            <p className="pass">{this.state.count}</p>
                            <p className="today">Today</p>
                        </div>
                        <div className="today_fail box fail">
                            <p className="fail">FAIL</p>
                            <p className="fail">{this.state.count}</p>
                            <p className="today">Today</p>
                        </div>
                    </div>
                    <div className="over_all">
                        <div className="header">
                            <p>Last Test</p>
                        </div>
                        <div className="tag">
                            <div className="fron"></div>
                            <div className="center_tag">
                                <p className="id">ID</p>
                                <div className="children">
                                    <p>DATE</p>
                                    <p>DC IR</p>
                                    <p>HIPOT 50Hz</p>
                                    <p>Power_leakage</p>
                                    <p>Earth Bond 50Hz</p>
                                </div>
                            </div>
                        </div>
                        {this.state.data.map(this._data)}
                    </div>
                </div>  
            </div>
        )
    }
}
