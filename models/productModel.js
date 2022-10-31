const mongoose = require('mongoose');

const { Schema } = mongoose;

const productModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    imageURL:
    {
      type: String,
    },
    categoryid:
    {
      type: mongoose.Types.ObjectId,
    },
  },
);

module.exports = mongoose.model('Product', productModel);
