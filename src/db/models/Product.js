// grab the things we need
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;

// create a schema
const ProductSchema = new Schema({
  asin:String,
  title: String,
  price: String,
  low_price: String,
  content: String,
  feature: Array,
  large_image: String,
  images: Array
});

// the schema is useless so far we need to create a model using it
const Product = mongoose.model('Product', ProductSchema);

// make this available to our users in our Node applications
module.exports = Product;