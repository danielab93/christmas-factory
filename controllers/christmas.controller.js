import Product from "../models/christmas.model.js";

const getProducts = async (req, res) => {
  // res = result
  const allProducts = await Product.find(); // warte erst bis das Produkt gefunden wird
  // response: gebe mir allProducts als json zurück
  res.json(allProducts);
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  const foundProduct = await Product.findById(productId);
  res.json(foundProduct);
};

const postProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    isVegan: req.body.isVegan,
    category: req.body.category,
    productTags: req.body.productTags,
    contactEmail: req.body.contactEmail,
  });
  const result = await newProduct.save();
  res.json(result);
};

const updateProduct = async (req, res) => {
  // in server.js = PUT
  const productId = req.params.productId; // req.params ermöglicht Zugriff auf alle Parameter im body
  const product = req.body;

  const result = await Product.findByIdAndUpdate(productId, product, {
    returnDocument: "after",
  });
  res.json(result);
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result) {
      res.json({ status: "Successfully deleted Product!" });
    } else {
      res.json({ status: "Could not delete Product" });
    }
  } catch (error) {
    res.json({ status: "Something else happend" });
  }
};

export { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
