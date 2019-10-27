import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStocks = this.onChangeStocks.bind(this);
        this.onChangeNewStock = this.onChangeNewStock.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            newStock: '',
            stocks: [],
            remove: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    newStock: '',
                    stocks: response.data.stocks,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        console.log(this.state.username);
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onChangeStocks(e) {
        this.setState({
            stocks: e.target.value
        })
    }

    onChangeNewStock(e) {
        this.setState({
            newStock: e.target.value
        })
    }

    onRemoveUser(e) {
        this.setState({
            remove: !this.state.remove,
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.remove) {
            const user = {
                username: this.state.username,
                password: this.state.password,
                stocks: this.state.stocks
            }
            axios.post('http://localhost:8000/users/remove/' + this.props.match.params.id, user)
                .then(res => console.log(res.data))
                .catch(error => {
                    console.log(error.response)
                });

        } else {
            this.state.stocks.push(this.state.newStock);
            // let tempArray = this.state.stocks;
            // tempArray.push(this.state.newStock);
            const user = {
                username: this.state.username,
                password: this.state.password,
                stocks: this.state.stocks
                // stocks: tempArray
            }
            console.log(user);
            axios.post('http://localhost:8000/users/update/' + this.props.match.params.id, user)
                .then(res => console.log(res.data))
        }

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
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
                                    <a class="nav-link" href="/profile">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/users">Users</a>
                                </li>
                            </ul>
                            {/* <a class="nav-link active" href="/home">Home</a>
                            <a class="nav-link" href="/registration">Registration</a>
                            <a class="nav-link" href="/login">Login</a>
                            <a class="nav-link" href="/edit">Profile</a> */}
                        </nav>
                    </div>
                </header>
                <h3 align="center">Update User</h3>
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
                            type="text"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Stocks: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.newStock}
                            onChange={this.onChangeNewStock}
                        />
                    </div>
                    <div className="form-check">
                        <label className="form-check-label" htmlFor="removeCheckbox">
                            Remove
                        </label>
                        <input className="form-check-input"
                            id="deleteCheckbox"
                            type="checkbox"
                            name="removeCheckbox"
                            onChange={this.onRemoveUser}
                            checked={this.state.remove}
                            value={this.state.remove}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}