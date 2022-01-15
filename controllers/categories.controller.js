import Category from "../models/category.model.js";

const getCategories = async (req, res) => {
  const allCategories = await Category.find();
  res.json(allCategories);
};

const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const foundCategory = await Category.findById(categoryId);
  res.json(foundCategory);
};

const postCategory = async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
  });
  const result = await newCategory.save();
  res.json(result);
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = req.body;

  const result = await Category.findByIdAndUpdate(categoryId, category, {
    returnDocument: "after",
  });
  res.json(result);
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await Category.findByIdAndDelete(categoryId);
    if (result) {
      res.json({ status: "Successfully deleted Category!" });
    } else {
      res.json({ status: "Could not delete Category" });
    }
  } catch (error) {
    res.json({ status: "Something else happend" });
  }
};

export {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
