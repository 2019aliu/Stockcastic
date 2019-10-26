const express = require('express');
const stockController = require('../controllers/stockController');

function routes (Artifact) { 
    const stockRouter = express.Router();
    const controller = stockController(Artifact);

    stockRouter.route('/')
        .post(controller.post)
        .get(controller.get);
    
    // maps an stock's ID with the stock itself
    stockRouter.use('/:stockId', (req, res, next) => {
        Stock.findById(req.params.stockId, (err, stock) => {
            if (err) {
                return res.send(err);
            }
            if (stock) {
                req.stock = stock;
                return next();
            }
            return res.sendStatus(404);
        });
    });

    stockRouter.route('/:stockId')
        .get(controller.getById)
        .put(controller.putById)
        .patch(controller.patchById)
        .delete(controller.deleteById);

    return stockRouter;
}

module.exports = routes