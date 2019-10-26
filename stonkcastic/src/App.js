import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import LoginPage from "./components/login-page.component.js";

class App extends Component {
  render() {
    return(
      <Router>
        <div className="container">
          <h2>MERN-Stack Todo App</h2>
        </div>
      </Router>
    )
  }
}

export default App;
