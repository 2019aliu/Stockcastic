const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Stock = new Schema({
    name: {
        type: String
    },
    data: {
        type: Array
    }
});

module.exports = mongoose.model('Stock', Stock);
