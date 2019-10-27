import React, { Component } from 'react';
import axios from 'axios';

const Stock = props => (
    <tr>
        <td>{props.stock}</td>
        <td>{props.sentiment}</td>
        <td>{props.risk}</td>
    </tr>
)

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [Object]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/gen/' + this.props.match.params.id)
            .then(response => {
                console.log("testing")
                console.log("stocks: " + response.data)
                this.setState({ stocks: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    stocksList() {
        console.log(this.state.stocks);
        return this.state.stocks.map(function (cur, i) {
            return <Stock stock={cur.id} sentiment={cur.s} risk={cur.r} key={i} />;
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
                            </ul>
                            {/* <a class="nav-link active" href="/home">Home</a>
                            <a class="nav-link" href="/registration">Registration</a>
                            <a class="nav-link" href="/login">Login</a>
                            <a class="nav-link" href="/edit">Profile</a> */}
                        </nav>
                    </div>
                </header>
                <h3>User Profile</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <th>Username</th>
                        <tr>
                            <th>Stocks</th>
                            <th>Sendiment</th>
                            <th>Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.stocksList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
