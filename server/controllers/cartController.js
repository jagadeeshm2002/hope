const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Cart = require("../models/cart");
const validateMongoDbId = require("../utils/validateMongoId");

const getCartItems = asyncHandler(async (req, res) => {
    const { userId: orderBy } = req.query;
    const filter = orderBy ? { orderBy } : {};
  try {
    
    const cart = await Cart.find(filter, { _v: 0, createAt: 0 });
    console.log(cart);
    res.json(cart);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const addToCart = asyncHandler(async (req, res) => {
    const { userId, cartItems, cartTotalQuantity, cartTotalAmount } = req.body;
    validateMongoDbId(userId);
  try {
    const user = await User.findById(userId);
    console.log(userId)
    if (user) {
      const cart = await Cart.create({
        user: userId,
        cartItems,
        cartTotalQuantity,
        cartTotalAmount,
      });
      res.json(cart);
    }
    
  } catch (error) {}
});

module.exports = { getCartItems ,addToCart};
