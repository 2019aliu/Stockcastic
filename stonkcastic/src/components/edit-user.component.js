import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onRemoveUser = this.onRemoveUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            Stock: '',
            remove: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,

                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
            stock: e.target.value
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
            const newUser = {
                username: this.state.username,
                password: this.state.password,
            }
            axios.post('http://localhost:8000/users/remove/' + this.props.match.params.id, newUser)
                .then(res => console.log(res.data))
                .catch(error => {
                    console.log(error.response)
                });

        } else {
            const user = {
                username: this.state.username,
                password: this.state.password
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
                    <div className="form-check">
                        <input className="form-check-input"
                            id="deleteCheckbox"
                            type="checkbox"
                            name="removeCheckbox"
                            onChange={this.onRemoveUser}
                            checked={this.state.remove}
                            value={this.state.remove}
                        />
                        <label className="form-check-label" htmlFor="removeCheckbox">
                            Remove
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}