import React, { Component } from 'react';
import axios from 'axios';
// import "../App.css";

// import "../styles/homePage.css";

export default class EditTodo extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <div class="text-center">
                {/* <h3 class="navbar-expand-sm masthead-brand">Cover</h3>
                <nav class="nav navbar-expand-sm justify-content bg-dark">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="/home">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/registration">Registration</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Login</a>
                        </li>
                    </ul>
                </nav> */}

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

                <main role="main" class="inner cover">
                    <h1 class="cover-heading">Stockastic.</h1>
                    <p class="lead"></p>
                    <p class="subtitle">Because recent events make <br/> the stock market stochastic.</p>
                    <p class="lead"></p>
                    <button class="lead button">
                        <a id="getStarted" href="/registration" class="btn btn-lg btn-secondary">Get started</a>
                    </button>
                </main>

                {/* <footer class="mastfoot mt-auto">
                    <div class="inner">
                        <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                    </div>
                </footer> */}
                {/* <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">


                    
                </div> */}
            </div>
        )
    }
}
