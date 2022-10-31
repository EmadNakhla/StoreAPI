/* eslint-disable no-param-reassign , no-underscore-dangle */
function productsController(Product) {
  function post(req, res) {
    const product = new Product(req.body);
    if (!req.body.name) {
      res.status(400);
      return res.json({ success: false, messages: 'Name is Required' });
    }
    product.save();
    res.status(201);
    return res.json({ success: true, product, messages: 'Product Created' });
  }
  function get(req, res) {
    const query = {};
    if (req.query.categoryid) {
      query.categoryid = req.query.categoryid;
    }
    Product.find(query, (err, products) => {
      if (err) {
        res.status(500);
        return res.json({ success: false, messages: err });
      }
      res.status(200);
      return res.json({ success: true, products, messages: `${products.length} products have been retrieved` });
    });
  }
  function put(req, res) {
    if (!req.body.name) {
      res.status(400);
      return res.json({ success: false, messages: 'Name is Required' });
    }
    const { product } = req;
    product.name = req.body.name;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.imageURL = req.body.imageURL;
    product.categoryid = req.body.categoryid;

    req.product.save((err) => {
      if (err) {
        res.status(500);
        return res.json({ success: false, messages: err });
      }
      res.status(200);
      return res.json({ success: true, product, messages: `${product.name} product has been updated` });
    });
  }
  function patch(req, res) {
    const { product } = req;
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      product[key] = value;
    });
    req.product.save((err) => {
      if (err) {
        res.status(500);
        return res.json({ success: false, messages: err });
      }
      res.status(200);
      return res.json({ success: true, product, messages: `${product.name} product has been updated` });
    });
  }
  function deleteProduct(req, res) {
    req.product.remove((err) => {
      if (err) {
        res.status(500);
        return res.json({ success: false, messages: err });
      }
      res.status(204);
      return res.json({ success: true, messages: `${req.product.name} product has been deleted` });
    });
  }
  function getPruductByID(req, res) {
    const { product } = req;
    res.status = 200;
    return res.json({ success: true, product, messages: `${product.name} products has been retrieved` });
  }
  return {
    post, get, put, patch, deleteProduct, getPruductByID,
  };
}

module.exports = productsController;
