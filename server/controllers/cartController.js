const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Cart = require("../models/cart");
const validateMongoDbId = require("../utils/validateMongoId");

const getCartItems = asyncHandler(async (req, res) => {
  const { userId: orderBy } = req.query;
  const filter = orderBy ? { orderBy } : {};

  try {
    const cart = await Cart.find(filter, { _id: 0, __v: 0, createdAt: 0 });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { userId, cart: { products, cartTotalAmount, cartTotalQuantity } } = req.body;
  

  validateMongoDbId(userId);

  try {
      const user = await User.findById(userId);
      const findCart = await Cart.findOne({ orderBy: userId });

      if(products.length ===0){
          const deleteCart = await Cart.findOneAndDelete({ orderBy: userId });
          return res.status(200).json({message:"Cart is empty", deleteCart});
      }
         
      
      if(findCart){
          const updateCart = await Cart.findByIdAndUpdate(findCart._id, {
              products,
              cartTotalAmount,
              cartTotalQuantity,
          }, {
              new: true,
          });
          return res.status(200).json(updateCart);
      }

      if (user) {
          const cart = await Cart.create({
              products,
              orderBy: userId,
              cartTotalAmount,
              cartTotalQuantity,
          });
          return res.status(201).json(cart);
      } else {
          return res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const cart = await Cart.findOneAndDelete({ orderBy: id });

  res.json(cart);
});
module.exports = { getCartItems ,addToCart,removeFromCart};

