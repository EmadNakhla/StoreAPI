const mongoose = require('mongoose');

const { Schema } = mongoose;

const categoryModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Category', categoryModel);
