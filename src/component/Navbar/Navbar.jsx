import React, { Component } from 'react'
import {Link} from "react-router-dom"
import './Navbar.scss'

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            setCount: 0
        }
    }

    componentDidMount(){
        const currentURL =window.location.pathname
        if (currentURL === "/history") {
            document.querySelector(".title01").classList.remove("active")
            document.querySelector(".title02").classList.add("active")
        }
      }  

    _onClick(e){
        const list = document.querySelectorAll(".title");
        const now = e.target;
        list.forEach((item) => {
            item.classList.remove("active")
        })
        now.classList.add('active')        
    }

    render() {
        return (
            <div className="bacl">
                <div className="head">
                    <h1>Electrical Safety Test Monitoring System</h1>
                </div>
                <div className="menu">
                    <ul>
                            <Link className="link" to={{pathname: "/dashboard",state: {test: "value"}}} onClick={this._onClick}>
                                <li className="title active title01">
                                    Dashboard
                                </li>
                            </Link>
                            <Link className="link" to={{pathname: "/history",state: {test: "value"}}}  name={this.state.test} onClick={this._onClick}>
                                <li className="title title02">
                                    History
                                </li>
                            </Link>
                            <Link className="link" to={{pathname: "/graph",state: {test: "value"}}}  name={this.state.test} onClick={this._onClick}>
                                <li className="title title02">
                                    Graph
                                </li>
                            </Link>
                    </ul>
                </div>
                <div className="head">
                    <p>ห้างหุ้นส่วนจำกัด แอมเพิล เวิร์ค</p>
                </div>
            </div>
            
        )
    }
}
