import React, { Component } from 'react';
import axios from 'axios';

export default class RegistrationPage extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            newStock: '',            
            stocks: []
        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeStock(e) {
        this.setState({
            newStock: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.state.stocks.push(this.state.newStock);

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            stocks: this.state.stocks
        }

        console.log('Form submitted:');
        console.log('Username: ${this.state.username}');
        console.log('Password: ${this.state.password}');
        console.log('Stocks: ${this.state.stocks}');

        console.log(newUser);

        axios.post('http://localhost:8000/users/add', newUser)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error.response)
            });

        this.setState({
            username: '',
            password: '',
            newStock: '',
            stocks: [],
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <header class="masthead mb-auto navbar navbar-expand-sm justify-content-center">
                    <div class="inner">
                        <nav class="nav nav-masthead navbar-fixed-top bg-dark">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <h3 id="masthead-brand">Stockastic</h3>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/registration">Registration</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/users">Profile</a>
                                </li>
                            </ul>
                            {/* <a class="nav-link active" href="/home">Home</a>
                            <a class="nav-link" href="/registration">Registration</a>
                            <a class="nav-link" href="/login">Login</a>
                            <a class="nav-link" href="/edit">Profile</a> */}
                        </nav>
                    </div>
                </header>
                <h1>Registration</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.newStock}
                            onChange={this.onChangeStock}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
