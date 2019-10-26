import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>{props.user.password}</td>
    </tr>
)

export default class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/users/')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        return(
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>                    
                </table>
            </div>
        )
    }
}
