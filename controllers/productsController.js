function productsController(Product) {
  function post(req, res) {
    const product = new Product(req.body);
    if(!req.body.name){
      res.status(400);
      return res.json({success: false, messages:'Name is Required'});
    }
    product.save();
    res.status(201);
    return res.json(product);
  }
  function get(req, res) {
    const query = {};
    if (req.query.categoryid) {
      query.categoryid = req.query.categoryid;
    }
    Product.find(query, (err, products) => {
      if (err) {
        return res.send(err);
      }
      return res.json(products);
    });
  }
  return { post, get };
}

module.exports = productsController;