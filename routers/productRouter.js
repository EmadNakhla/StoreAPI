const express = require('express');
const productsController = require('../controllers/productsController');

function routes(Product) {
  const productsRouter = express.Router();
  const controller = productsController(Product);

  productsRouter.route('/products')
    .post(controller.post)
    .get(controller.get);
  productsRouter.use('/products/:productId', (req, res, next) => {
    Product.findById(req.params.productId, (err, product) => {
      if (err) {
      res.status(500);
      return res.json({ success: false, messages: err });
      }
      if (product) {
        req.product = product;
        return next();
      }
      res.status(404);
      return res.json({ success: false, messages: 'Product Not Found' });
    });
  });
  productsRouter.route('/products/:productId')
    .get(controller.getPruductByID)
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteProduct);

  return productsRouter;
}

module.exports = routes;
