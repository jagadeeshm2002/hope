const { Query } = require("mongoose");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const findProducts = async (query) =>
  Product.find(query, { _id: 0, created: 0, __v: 0 });

const products = asyncHandler(async (req, res) => {
  const query = { ...req.query };
  const productsData = await findProducts(query);
  res.json(productsData);
});

const singleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { query } = req.query;
  const productdata = await Product.find(
    { slug: id },
    { _id: 0, created: 0, __v: 0 }
  );
  res.json(productdata);
});

const uploadProduct = asyncHandler(async (req, res) => {
  await Product.insertMany();
  res.json({ message: "data inserted" });
});
// const data = {
//   sku: "1",
//   name: 'dress number one',
//   slug: "dress-1",
//   description: "dress with good one you can sure ware it",
//   quantity: 100,
//   price: 124,
// };

module.exports = { products, uploadProduct, singleProduct };
