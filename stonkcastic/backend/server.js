const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./user.model');
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true
});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

const userRoutes = express.Router();

app.use('/users', userRoutes);

userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({ 'user': 'user added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/addStock').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.stock = req.body.stock;

        user.save().then(user => {
            res.json('User Stock added!');
        })
            .catch(err => {
                res.status(400).send("Stock addition not possible");
            })
    });
});

userRoutes.route('/remove/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.remove().then(user => {
                res.json('User removed!');
            })
                .catch(err => {
                    res.status(400).send("Remove not possible");
                });
    });
});

userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.username = req.body.username;
        user.password = req.body.password;

        user.save().then(user => {
            res.json('User updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});






const axios = require("axios")
var apiKey = "AIzaSyB_Y51vD13VuDeqBpokdcr4XFf9JOtra6A";
var newsAPIKEY = "add39bc2d81b4cb0855a07e429e88ba8"
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
            sentiment = res.data.documentSentiment.score
        })
        .catch((error) => {
            console.error("error")
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
var output
async function callback(res) {
    var sentsStrings = []
    var len = Math.min(res.data.articles.length, 5)
    for (var i = 0; i < len; i++) {
        sentsStrings.push(res.data.articles[i.toString(10)].content)
    }
    var sents = await getSentimentArr(sentsStrings)
    var sumSentiments = 0
    for (var i = 0; i < sents.length; i++) {
        sumSentiments += sents[i]
    }
    output = sumSentiments / sents.length
}
async function getNewsSentiment(keyword) {
    output = -1
    await axios.get("https://newsapi.org/v2/everything" + "?q=" + encodeURI(keyword) + "&apiKey=" + newsAPIKEY)
        .then(callback)
        .catch((error) => {
            console.error(error)
        })
    // return sentiment
    return output
}
var consumer_key = 'UVhvxPB1meyu1wtp1vFK9tNM8'
var consumer_secret = '9exiiRqNBWJyGzaCMXieM3R47VjWmFiWZ5sJYci41aZqfkhiJL'
var bearer_token = "AAAAAAAAAAAAAAAAAAAAADjdAQEAAAAAqQ6pTA%2BNHgXmsGxEUR%2BUOWfcJPs%3Dx3b8EgW5oj4RZPd01FJSlt0BUJMT8jhdaGLOYtEga885YsslUX"
var access_token_key = '1188102816683872258-EJaD1MrzuOeUzVPXmsm8jYeuYDeSm4'
var access_token_secret = 'zqbm9sa0Tw7e1gmarxt0X1CTkAaJvEKoG5ly2wnDDct7q'

var Twitter = require('twitter-node-client').Twitter;

var config = {
    "consumerKey": "UVhvxPB1meyu1wtp1vFK9tNM8",
    "consumerSecret": "9exiiRqNBWJyGzaCMXieM3R47VjWmFiWZ5sJYci41aZqfkhiJL",
    "accessToken": "1188102816683872258-EJaD1MrzuOeUzVPXmsm8jYeuYDeSm4",
    "accessTokenSecret": "zqbm9sa0Tw7e1gmarxt0X1CTkAaJvEKoG5ly2wnDDct7q",
    "callBackUrl": "http://lvh.me:3000"
}
var tweet_blob = ""
var tweet_sent = -1
async function get_tweet_sent(blob) {
    tweet_sent = -1
    tweet_sent = await getSentiment(blob)
}
async function tweet_blob_callback(data) {
    var obj = JSON.parse(data);
    for (var i = 0; i < obj.statuses.length; i++) {
        var twt = obj.statuses[i].full_text;
        tweet_blob += twt + ".\n";
    }
    await get_tweet_sent(tweet_blob)
}
async function analyze_tweet(keyword) {
    tweet_blob = ""
    var Twitter = require('twitter-node-client').Twitter;
    var twitter = new Twitter(config)
    await twitter.getSearch(
        {
            'q': encodeURI(keyword), 'lang': 'en', 'tweet_mode': 'extended', 'count': 50
        },
        (error, response, body) => { console.log('Error'); },
        tweet_blob_callback);
    return tweet_sent
}

async function analyze_stock(stock) {
    var s1 = await analyze_tweet(stock)
    var s2 = await analyze_tweet(stock + " Stock")
    var s3 = await getNewsSentiment(stock + " Stock")
    // console.log("(" + s1 + ", " + s2 + ", " + s3 + ")")
    return (s1 + s2 + 8 * s3) / 10.0
}

async function get_stock_risk(stock_id) {
    var risk = -1
    var stability = -1
    await axios.get("https://www.blackrock.com/tools/hackathon/performance?identifiers=" + stock_id + "&query=" + stock_id)
        .then((res) => {
            // res = JSON.stringify(res)
            // console.log(res)
            // res = res.substring(res.indexOf("oneYearRisk"))
            // res = res.substring(0, res.indexOf(",")).trim();
            // console.log(res)
            // output = parseFloat(res);
            const getCircularReplacer = () => {
                const seen = new WeakSet();
                return (key, value) => {
                    if (typeof value === "object" && value !== null) {
                        if (seen.has(value)) {
                            return;
                        }
                        seen.add(value);
                    }
                    return value;
                };
            };

            res = JSON.stringify(res, getCircularReplacer());
            orig = (' ' + res).slice(1);
            res = res.substring(res.indexOf("oneYearRisk") + 13)
            res = res.substring(0, res.indexOf(",")).trim();
            risk = parseFloat(res);

            orig = orig.substring(orig.indexOf("eightYearRisk") + 15)
            orig = orig.substring(0, orig.indexOf(",")).trim();
            var eightyr = parseFloat(orig)
            stability = eightyr - risk;
        })
        .catch((error) => {
            console.error(error)
        })
    return [risk, stability]
}

async function main() {
    /*
    Ibio is bad
    Macys
    CMG Chipotle
    */
    // var badStocks = ["Macy's M Stock", "NKTR Stock", "ABMD Stock", "KHC Stock", "TPR Stock"]
    // var goodStocks = ["MKTX Stock", "TSN Stock", "BLL Stock", "AMD Stock"]
    // console.log("bad stocks:")
    // for (var i = 0; i < badStocks.length; i++) {
    //     var s = await analyze_stock(badStocks[i])
    //     console.log(`output for ${badStocks[i]} is ${s}`)
    // }
    // console.log("\n\n\n")
    // console.log("good stocks")
    // for (var i = 0; i < goodStocks.length; i++) {
    //     var s = await analyze_stock(goodStocks[i])
    //     console.log(`output for ${goodStocks[i]} is ${s}`)
    // }
    stocks = ["AAPL", "TSLA", "M", "UNP"]
    for (var i = 0; i < stocks.length; i++) {
        var out = await get_stock_risk(stocks[i])
        var risk = out[0]
        var stability = out[1]
        console.log(stocks[i] + " - risk: " + risk + " stability: " + stability)
    }
}
main()