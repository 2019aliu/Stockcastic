const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Stock = new Schema({
    _id: Schema.Types.ObjectId,
    stock_name: String,
    stock_ticker: String,
    stock_price: Number,
    stock_sentiment: Number
});

// doesn't actually do anything lel
module.exports = mongoose.model('StockSchema', Stock);