// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const PORT = 4000;
//
// app.use(cors());
// app.use(bodyParser.json());
//
// app.listen(PORT, function() {
//     console.log("Server is running on Port: " + PORT);
// });





// Server-side routing and stuff

//
/* Importing package, setting up stuff */
//

// Importing packages
const express = require('express');
const app = express();  // make the express server
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const StockRoutes = express.Router();
app.use('/StockRoute', StockRoutes);
const PORT = 4000;  // define which port the server is listening on
const Schema = mongoose.Schema;
let StockSchema = new Schema({
    stock_name: {type: String},
    stock_ticker: {type: String},
    stock_price: {type: Number},
    stock_sentiment: {type: Number}
});

let Stock = mongoose.model('Stock', StockSchema);

// Middleware lookin
app.use(cors());
app.use(bodyParser.json());

//
/* MongoDB connection */
//

// Connect MongoDB with server
mongoose.connect('mongodb://127.0.0.1:27017/StockRoute', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//
/* Routing for Stocks */
//

// Get router to get all stocks
StockRoutes.route('/').get(function (req, res) {
    Stock.find(function(err, stocks) {
        if (err) {
            console.log(err);
        } else {
            res.json(stocks);
        }
    });
});

// Get router by ID to get stocks
StockRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Stock.findById(id, function (err, stock) {
        res.json(stock);
    });
});

// Add router for stocks
StockRoutes.route('/add').post(function (req, res) {
    let stock = new Stock(req.body);
    stock.save()
        .then(stock => {
            res.status(200).json({'stock': 'Stock added successfully'});
        })
        .catch(err => {
            res.status(400).send('Adding new stock failed');
        });
});

// Update router for stocks by ID
StockRoutes.route('/update/:id').post(function (req, res) {
    Stock.findById(req.params.id, function (err, stock) {
        if (!stock)
            res.status(404).send("data is not found");
        else
            stock.stock_name = req.body.stock_name;
            stock.stock_price = req.body.stock_price;
            stock.stock_ticker = req.body.stock_ticker;
            stock.stock_sentiment = req.body.stock_sentiment;

            stock.save().then(stock => {
                res.json('Stock updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// Get the server running on the chosen port (4000 is usually open ig)
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});