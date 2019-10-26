import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./components/login-page.component.js";

class App extends Component {
  render() {
    return(
      <Router>
        <div className="container">
          <h2>MERN-Stack Todo App</h2>
        </div>
        <Route path="/login" component={LoginPage} />
      </Router>
    )
  }
}

export default App;
