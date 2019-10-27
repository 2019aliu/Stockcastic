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
