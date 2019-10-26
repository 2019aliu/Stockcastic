import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LoginPage from './components/login-page.component.js';
// const Language = require('@google-cloud/language');

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <h2>MERN-Stack Todo App</h2>
        </div>
      </Router>
    )
  }
}
const axios = require("axios")
var apiKey = "AIzaSyB_Y51vD13VuDeqBpokdcr4XFf9JOtra6A";
var apiEndpoint = 'https://language.googleapis.com/v1/documents:analyzeSentiment?key=' + apiKey;

var postiveHackgtString = "HackGT is a very fun, enjoyable, and impressive event. I enjoy it a lot."

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
async function main() {
  var sentiment = await getSentiment(postiveHackgtString)
  console.log("the sentiment is ... " + sentiment)

  var sentiment = await getSentiment("This suck I hate this water bottle because its too leaky")
  console.log("the sentiment is ... " + sentiment)

  var sentiment = await getSentiment("Wow Tesla rose 15% today!!! :-)")
  console.log("the sentiment is ... " + sentiment)

  var sentiment = await getSentiment(postiveHackgtString)
  console.log("the sentiment is ... " + sentiment)
}
main()
export default App;
