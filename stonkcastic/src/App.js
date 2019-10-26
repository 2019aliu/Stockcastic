import 'bootstrap/dist/css/bootstrap.min.css';

import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import LoginPage from './components/login-page.component.js';

class App extends Component {
  render() {
    return(
      <Router>
        <div className='container'>
          <h2>MERN-Stack Todo App</h2>
        </div>
      </Router>
    )
  }
}
var happyString = 'Yay! this is so great!'
async function do_sentiment() {
  // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

        // Instantiates a client
        const client = new language.LanguageServiceClient();

        // The text to analyze
        const text = happyString;

        const document = {
          content: text,
          type: 'PLAIN_TEXT',
        };

        // Detects the sentiment of the text
        const [result] = await client.analyzeSentiment({document: document});
        const sentiment = result.documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  }
  do_sentiment();

  export default App;
