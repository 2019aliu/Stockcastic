import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./components/login-page.component.js";
import Users from "./components/user-list.component.js";

class App extends Component {
  render() {
    return(
      <Router>
        <div className="container">
        </div>
            <Route path="/login" component={LoginPage} />
	    <Route path="/users" component={Users} />
      </Router>
    )
  }
}

export default App;
