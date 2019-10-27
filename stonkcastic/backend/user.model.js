const mongoose = require('mongoose');
const Stock = require('./stock.model');
const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    stocks: {
        type: [String]
    }
});

module.exports = mongoose.model('User', User);
