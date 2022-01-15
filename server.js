import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from "./controllers/products.controller.js";

import {
  getCategories,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
} from "./controllers/categories.controller.js";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
console.log(connectionString);
mongoose.connect(connectionString);

const server = express(); // express = middleware, dadurch können wir mit der Datenbank sprechen, Kommunikator zwischen Datenbank & Code

/* mongoose.connect("mongodb://localhost:27017/christmas-factory"); */
server.listen(4004, () => console.log("Server is up and running!"));

server.use(cors());
server.use(express.json());

server.get("/products", getProducts);
server.get("/products/:productId", getProduct);
server.post("/products", postProduct);
server.put("/products/:productId", updateProduct);
server.delete("/products/:productId", deleteProduct);

server.get("/categories", getCategories);
server.get("/categories/:categoryId", getCategory);
server.post("/categories", postCategory);
server.put("/categories/:categoryId", updateCategory);
server.delete("/categories/:categoryId", deleteCategory);
