import React, { Component } from 'react';
import axios from 'axios';

const Stock = props => (
    <tr>
        <td>{props.stock}</td>
        <td>Input Sentiment</td>
        <td>Input Data</td>
    </tr>
)

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {      
            stocks: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({ stocks: response.data.stocks });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    stocksList() {
        console.log(this.state.stocks);
        return this.state.stocks.map(function (currentStock, i) {
            return <Stock stock={currentStock} key={i} />;
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
