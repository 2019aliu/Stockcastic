import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./components/login-page.component.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        </div>
        <Route path="/login" component={LoginPage} />
      </Router>
    )
  }
}
const axios = require("axios")
var apiKey = "AIzaSyB_Y51vD13VuDeqBpokdcr4XFf9JOtra6A";
var apiEndpoint = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + apiKey;

async function getSentiment(str) {
  var sentiment = -1
  var doc = {
    language: 'en-us',
    type: 'PLAIN_TEXT',
    content: str
  };

  var data = {
    document: doc,
    encodingType: 'UTF8'
  };
  await axios.post(apiEndpoint, data)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
      sentiment = res.data.documentSentiment.score
      // console.log("the sentiment is ... " + sentiment)
    })
    .catch((error) => {
      console.error(error)
    })
  return sentiment
}
async function getSentimentArr(arr) {
  var sents = []
  for (var i = 0; i < arr.length; i++) {
    sents.push(await getSentiment(arr[i]))
  }
  return sents
}

async function main() {
  var strings = []
  strings.push("This suck I hate this water bottle because its too leaky.")
  strings.push("Wow Tesla rose 15% today!!! :-)")
  strings.push("HackGT is a very fun, enjoyable, and impressive event. I enjoy it a lot.")
  var sents = await getSentimentArr(strings)
  console.log(sents)
}
main()
export default App;
