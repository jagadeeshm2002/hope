const { Query } = require("mongoose");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");



const products = asyncHandler(async (req, res) => {
  try {
    // // Extract query parameters
    // const { page = 1, limit = 10, sortBy, sortOrder, ...filters } = req.query;

    // // Construct query with filters
    // const query = { ...filters };
    const query = req.query;

    // // Calculate skip value for pagination
    // const skip = (page - 1) * limit;

    // // Create sorting object based on provided sortBy and sortOrder
    // const sort = sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : null;

    // Fetch products with pagination and sorting
    const productsData = await Product.find(query, { _id: 0, created: 0, __v: 0 })
      // .sort(sort)
      // .skip(skip)
      // .limit(parseInt(limit));

    // Return paginated product data
    res.json(productsData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const singleProduct = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;

    const productdata = await Product.findOne(
      { slug },
      { _id: 0, created: 0, __v: 0 }
    );

    if (!productdata) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(productdata);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
