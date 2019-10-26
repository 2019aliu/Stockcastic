const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/Stockcastic', { useNewUrlParser: true});
// const port = process.env.PORT || 4000;
const port = 4000;

const Stock = require('./models/stockModel');

const StockRouter = require('./routes/stockRouter');

app.use('/api/stocks', StockRouter);

app.server = app.listen(port, () => {
    console.log(`Express server started on port: ${port}`);
});

module.exports = app;