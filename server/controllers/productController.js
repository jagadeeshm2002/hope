const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const products = asyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, category, limit = 18 } = req.query;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Create a filter object for category
    const filter = category ? { category } : {};

    // Fetch products with pagination and filtering
    const productsData = await Product.find(filter, {
      created: 0,
      __v: 0,
    })
      .skip(skip)
      .limit(parseInt(limit, 10));

    const total = await Product.countDocuments(filter);

    

    // Return paginated product data
    res.json({ productsData, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const singleProduct = asyncHandler(async (req, res) => {
  try {
    const { slug } = req.params;

    const productdata = await Product.findOne({ slug }, { created: 0, __v: 0 });

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
  console.log("data inserted");
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
