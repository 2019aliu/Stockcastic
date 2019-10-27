import React, { Component } from 'react';
import axios from 'axios';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
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

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }

        console.log('Form submitted:');
        console.log('Username: ${this.state.username}');
        console.log('Password: ${this.state.password}');

        console.log(newUser);

        axios.post('http://localhost:8000/users/auth', newUser)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log(error.response)
            });

        this.setState({
            username: '',
            password: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Login Page</h3>
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
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
