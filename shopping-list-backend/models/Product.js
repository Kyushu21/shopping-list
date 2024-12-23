const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchased: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;