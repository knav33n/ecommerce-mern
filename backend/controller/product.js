import asynHandler from "express-async-handler";
import Product from "../models/product.js";

// @desc   Fetch all products
// @route  GET /api/v1/products
// @access Public
const getProducts = asynHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   Fetch single product
// @route  GET /api/v1/products/:id
// @access Public
const getProductById = asynHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
