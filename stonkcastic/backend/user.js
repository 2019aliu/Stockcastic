const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Stock = require('./Stock');

// the tutorial says to use {type: String}
// but as long as we don't have anything else
// itll be ok
let User = new Schema({
    user_name: {type: String},
    user_pass: {type: String},
    user_stocks: {type: [String]}
});

// doesn't actually do anything lel
module.exports = mongoose.model('UserScheme', User);