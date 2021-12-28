import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  isVegan: Boolean,
  category: String,
  productTags: String,
  contactEmail: String,
});

const Product = mongoose.model("Product", productSchema);
// mit den Großbuchstaben wird es zum Model

export default Product;
