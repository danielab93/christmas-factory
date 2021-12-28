import express from "express";
import mongoose from "mongoose";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/christmas.controller.js";

const server = express();

mongoose.connect("mongodb://localhost:27017/christmas-factory");
server.listen(4004, () => console.log("Server is up and running!"));

server.use(express.json());

server.get("/products", getProducts);

server.get("/products/:productId", getProduct);

server.post("/products", postProduct);

server.put("/products/:productId", updateProduct);

server.delete("/products/:productId", deleteProduct);
