import React, { Component } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar';
import ReactPaginate from 'react-paginate';
import 'react-calendar/dist/Calendar.css';

import './History.scss'


export default class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            perPage: 5,
            currentPage: 0,
            date1: new  Date(),
            date2: new Date()
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
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
                this.setState({
                    data: check_data
                })
                const slice = check_data.slice(this.state.offset, this.state.offset + this.state.perPage)
                console.log(check_data)
                const postData = slice.map((pa) => 
                    <div className={pa.result.overallResult === "Passed" ? "detail_history box pass": "detail_history box fail"}>
                        <div className="left_history">
                            <p>ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{pa.result.id}</p>
                            <p>DATE:&nbsp;&nbsp; {pa.result.date}</p>
                            <p>OverAllTest:&nbsp;&nbsp; {pa.result.overallResult}</p>
                        </div>
                        <div className="child_history">
                            {pa.result.appliance[0]? 
                            <div className={pa.result.appliance[0].test_result.testState === "Passed" ? "card_history box pass": "card_history box fail"}>
                                <div className="name_history">
                                    <p>{pa.result.appliance[0].test.name}</p>
                                    <p className={pa.result.appliance[0].test_result.testState === "Passed"?"pass":"fail"}>{pa.result.appliance[0].test_result.testState}</p>
                                </div>
                                <div className="detail_card_history">
                                    <h4>Result</h4>
                                    <p>appliedOutputAmps:&nbsp;{pa.result.appliance[0].test_result.appliedOutputAmps}</p>
                                    <p>testState:&nbsp;{pa.result.appliance[0].test_result.testState}</p>
                                    <p>timeOfTest:&nbsp;{pa.result.appliance[0].test_result.timeOfTest}<br/><br/></p>
                                    <h4>Detail</h4>
                                    <p>lowerLimitMilliohms:&nbsp;{pa.result.appliance[0].test.lowerLimitMilliohms}</p>
                                    <p>name:&nbsp;{pa.result.appliance[0].test.name}</p>
                                    <p>numTests:&nbsp;{pa.result.appliance[0].test.numTests}</p>
                                    <p>targetOutputAmps:&nbsp;{pa.result.appliance[0].test.targetOutputAmps}</p>
                                    <p>timeHoldSeconds:&nbsp;{pa.result.appliance[0].test.timeHoldSeconds}</p>
                                    <p>timeRampDownSeconds:&nbsp;{pa.result.appliance[0].test.timeRampDownSeconds}</p>
                                    <p>timeRampUpSeconds:&nbsp;{pa.result.appliance[0].test.timeRampUpSeconds}</p>
                                    <p>type:&nbsp;{pa.result.appliance[0].test.type}</p>
                                    <p>upperLimitMilliohms:&nbsp;{pa.result.appliance[0].test.upperLimitMilliohms}</p>
                                </div>
                            </div>
                            : null}
                            {pa.result.appliance[1]? 
                            <div className={pa.result.appliance[1].test_result.testState === "Passed" ? "card_history box pass": "card_history box fail"}>
                                <div className="name_history">
                                    <p>{pa.result.appliance[1].test.name}</p>
                                    <p className={pa.result.appliance[1].test_result.testState === "Passed"?"pass":"fail"}>{pa.result.appliance[1].test_result.testState}</p>
                                </div>
                                <div className="detail_card_history">
                                    <h4>Result</h4>
                                    <p>appliedOutputAmps:&nbsp;{pa.result.appliance[1].test_result.appliedOutputAmps}</p>
                                    <p>testState:&nbsp;{pa.result.appliance[1].test_result.testState}</p>
                                    <p>timeOfTest:&nbsp;{pa.result.appliance[1].test_result.timeOfTest}<br/><br/></p>
                                    <h4>Detail</h4>
                                    <p>lowerLimitMilliohms:&nbsp;{pa.result.appliance[1].test.lowerLimitMilliohms}</p>
                                    <p>name:&nbsp;{pa.result.appliance[1].test.name}</p>
                                    <p>numTests:&nbsp;{pa.result.appliance[1].test.numTests}</p>
                                    <p>targetOutputAmps:&nbsp;{pa.result.appliance[1].test.targetOutputAmps}</p>
                                    <p>timeHoldSeconds:&nbsp;{pa.result.appliance[1].test.timeHoldSeconds}</p>
                                    <p>timeRampDownSeconds:&nbsp;{pa.result.appliance[1].test.timeRampDownSeconds}</p>
                                    <p>timeRampUpSeconds:&nbsp;{pa.result.appliance[1].test.timeRampUpSeconds}</p>
                                    <p>type:&nbsp;{pa.result.appliance[1].test.type}</p>
                                    <p>upperLimitMilliohms:&nbsp;{pa.result.appliance[1].test.upperLimitMilliohms}</p>
                                </div>
                            </div>
                            : null}
                            {pa.result.appliance[2]? 
                            <div className={pa.result.appliance[2].test_result.testState === "Passed" ? "card_history box pass": "card_history box fail"}>
                                <div className="name_history">
                                    <p>{pa.result.appliance[2].test.name}</p>
                                    <p className={pa.result.appliance[2].test_result.testState === "Passed"?"pass":"fail"}>{pa.result.appliance[2].test_result.testState}</p>
                                </div>
                                <div className="detail_card_history">
                                    <h4>Result</h4>
                                    <p>appliedOutputAmps:&nbsp;{pa.result.appliance[2].test_result.appliedOutputAmps}</p>
                                    <p>testState:&nbsp;{pa.result.appliance[2].test_result.testState}</p>
                                    <p>timeOfTest:&nbsp;{pa.result.appliance[2].test_result.timeOfTest}<br/><br/></p>
                                    <h4>Detail</h4>
                                    <p>lowerLimitMilliohms:&nbsp;{pa.result.appliance[2].test.lowerLimitMilliohms}</p>
                                    <p>name:&nbsp;{pa.result.appliance[2].test.name}</p>
                                    <p>numTests:&nbsp;{pa.result.appliance[2].test.numTests}</p>
                                    <p>targetOutputAmps:&nbsp;{pa.result.appliance[2].test.targetOutputAmps}</p>
                                    <p>timeHoldSeconds:&nbsp;{pa.result.appliance[2].test.timeHoldSeconds}</p>
                                    <p>timeRampDownSeconds:&nbsp;{pa.result.appliance[2].test.timeRampDownSeconds}</p>
                                    <p>timeRampUpSeconds:&nbsp;{pa.result.appliance[2].test.timeRampUpSeconds}</p>
                                    <p>type:&nbsp;{pa.result.appliance[2].test.type}</p>
                                    <p>upperLimitMilliohms:&nbsp;{pa.result.appliance[2].test.upperLimitMilliohms}</p>
                                </div>
                            </div>
                            : null}
                            {pa.result.appliance[3]? 
                            <div className={pa.result.appliance[3].test_result.testState === "Passed" ? "card_history box pass": "card_history box fail"}>
                                <div className="name_history">
                                    <p>{pa.result.appliance[3].test.name}</p>
                                    <p className={pa.result.appliance[3].test_result.testState === "Passed"?"pass":"fail"}>{pa.result.appliance[3].test_result.testState}</p>
                                </div>
                                <div className="detail_card_history">
                                    <h4>Result</h4>
                                    <p>appliedOutputAmps:&nbsp;{pa.result.appliance[3].test_result.appliedOutputAmps}</p>
                                    <p>testState:&nbsp;{pa.result.appliance[3].test_result.testState}</p>
                                    <p>timeOfTest:&nbsp;{pa.result.appliance[3].test_result.timeOfTest}<br/><br/></p>
                                    <h4>Detail</h4>
                                    <p>lowerLimitMilliohms:&nbsp;{pa.result.appliance[3].test.lowerLimitMilliohms}</p>
                                    <p>name:&nbsp;{pa.result.appliance[3].test.name}</p>
                                    <p>numTests:&nbsp;{pa.result.appliance[3].test.numTests}</p>
                                    <p>targetOutputAmps:&nbsp;{pa.result.appliance[3].test.targetOutputAmps}</p>
                                    <p>timeHoldSeconds:&nbsp;{pa.result.appliance[3].test.timeHoldSeconds}</p>
                                    <p>timeRampDownSeconds:&nbsp;{pa.result.appliance[3].test.timeRampDownSeconds}</p>
                                    <p>timeRampUpSeconds:&nbsp;{pa.result.appliance[3].test.timeRampUpSeconds}</p>
                                    <p>type:&nbsp;{pa.result.appliance[3].test.type}</p>
                                    <p>upperLimitMilliohms:&nbsp;{pa.result.appliance[3].test.upperLimitMilliohms}</p>
                                </div>
                            </div>
                            : null}
                        </div>
                    </div>
                )
                this.setState({
                    pageCount: Math.ceil(check_data.length / this.state.perPage),
                    postData
                })
        })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
  
    };
  
    componentDidMount() {
        this.receivedData()
    }
    render() {
        return (
            <div className="body_history">
                <h1>HISTORY</h1>
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
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
  
        )
    }
}
