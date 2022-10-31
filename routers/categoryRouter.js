const express = require('express');

function routes(Category) {
  const categoryRouter = express.Router();

  categoryRouter.route('/categories')
    .get((req, res) => {
      Category.find((err, categories) => {
        if (err) {
          return res.send(err);
        }
        return res.json(categories);
      });
    });
  return categoryRouter;
}

module.exports = routes;
