const mongoose = require('mongoose');

const { Schema } = mongoose;

const stockModel = new Schema({
    stock_name: String,
    stock_ticker: String,
    stock_price: Number,
    stock_sentiment: Number
});

const Stock = mongoose.model('Stock', stockModel);

module.exports = Stock;