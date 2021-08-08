import './App.css';
// Tools.
import {Route, Switch,BrowserRouter as Router} from "react-router-dom"

// Pages.
import Dashboard from './component/Dashboard/Dashboard';
import History from './component/History/History';
import Graph from './component/Graph/Graph'
import Navbar from './component/Navbar/Navbar';
import React, {Component} from 'react';

export default class App extends Component{

  constructor(props){
    super(props);
    this.staet = {

    }
  }

  render(){
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/dashboard"  component={Dashboard}/>
          <Route path="/history" component={History} />
          <Route path="/graph" component={Graph} />
        </Switch>
      </div>
    </Router>
    )
  }
}

// function App() {
//   return (
    
//   );
// }

// export default App;
