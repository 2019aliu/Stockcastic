function stockController(Stock) {
    function post(req, res) {
        const stock = new Stock(req.body);
        /* check for required fields */
        if (!req.body.stock_name) {
            res.status(400);
            return res.send('Name of stock is required');
        }

        stock.save();
        res.status(201);
        return res.json(stock);
    }

    function get(req, res) {
        const { query } = req;
        Stock.find(query, (err, stocks) => {
            if (err) {
                return res.send(err);
            }
            return res.json(stocks);
        });
    }

    function getById (req, res)
    {
        res.json(req.stock);
    }

    function putById (req, res) {
        const { stock } = req;
        /* One-for-one relationship between request (req) elements and the model */
        stock.stock_name = req.body.stock_name;
        stock.stock_price = req.body.stock_price;
        stock.stock_ticker = req.body.stock_ticker;
        stock.stock_sentiment = req.body.stock_sentiment;
        req.stock.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json(stock);
        });
    }

    function patchById (req, res) {
        const { stock } = req;
        if (req.body._id) {
            delete req.body._id;
        }
        Object.entries(req.body).forEach(item => {
            const key = item[0];
            const value = item[1];
            stock[key] = value;
        })
        req.stock.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json(stock);
        });
    }

    function deleteById (req, res) {
        req.stock.remove((err) => {
            if (err) {
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    }

    return { post, get, getById, putById, patchById, deleteById };
}

module.exports = stockController;