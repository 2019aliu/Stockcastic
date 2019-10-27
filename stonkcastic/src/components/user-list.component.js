import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>{props.user.password}</td>
        <td>{props.user.stocks}</td>
        <td>
            <Link to={"/edit/" + props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    userList() {
        console.log(this.state.users);
        return this.state.users.map(function (currentUser, i) {
            return <User user={currentUser} key={i} />;
        })
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
                                    <a class="nav-link" href="/users">Profile</a>
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
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Stocks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
