import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model("Category", categorySchema);
// mit den Großbuchstaben wird es zum Model

export default Category;
