import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RegistrationPage from "./components/registration-page.component.js";
import LoginPage from "./components/login-page.component.js";
import UserList from "./components/user-list.component.js";
import EditUser from "./components/edit-user.component.js";
import UserProfile from "./components/user-profile.component.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        </div>
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegistrationPage} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/users" component={UserList} />
        <Route path="/profile/:id" component={UserProfile} />
      </Router>
    )
  }
}

export default App;
