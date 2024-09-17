const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const products = asyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, category, brand, price, limit = 18 } = req.query;

    // Initialize filter object
    const filter = {};

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Apply category filter if provided, or default to "all"
    if (category && category !== "all") {
      filter.category = { $in: [category] };
    }

    // Apply brand filter if provided, or default to "Hope"
    if (brand && brand !== "hope") {
      filter.brand = brand;
    }

    // Apply price filter if provided
    if (price) {
      const priceRange = price.split(",");
      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        filter["price.offerPrice"] = { $gte: minPrice, $lte: maxPrice };
      }
    }

    // Fetch products with pagination and filtering
    const productsData = await Product.find(filter, {
      created: 0,
      __v: 0,
    })
      .skip(skip)
      .limit(parseInt(limit, 10));

    // Fetch the total number of matching products
    const total = await Product.countDocuments(filter);
    if (productsData.length === 0) {
      return res.json({ productsData, total, totalPages: 0 });
    }
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
