const User = require("../models/User");
const Address = require("../models/address");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");
const Favourite = require("../models/favourite");
const Order = require("../models/order");

const getUserInfo = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  // Validate the userId
  validateMongoDbId(userId);

  try {
    // Find user by ID and exclude specified fields
    const user = await User.findById(
      userId,
      "-password -isAdmin -tokens -created -__v"
    );

    // If user is not found, send a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data
    res.json(user);
  } catch (error) {
    // Handle errors and send a 500 response
    res.status(500).json({
      message: "An error occurred while retrieving user information",
      error: error.message,
    });
  }
});
const editUserInfo = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const { name, phoneNumber } = req.body;
  validateMongoDbId(userId);
  const query = { _id: userId };
  const updatedUser = await User.findByIdAndUpdate(
    query,
    { name, phoneNumber },
    { new: true, select: "-password -isAdmin -created -__v" }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(201).json({
    message: "User information updated successfully",
    data: updatedUser,
  });
});

const getAddresses = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    validateMongoDbId(userId);
    const addresses = await Address.find(
      { userId },
      "-updatedAt -createdAt -__v"
    );
    res.json(addresses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const getSingleAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    validateMongoDbId(userId);
    const address = await Address.find(
      { _id: addressId, userId },
      "-updatedAt -createdAt -__v"
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
const addAddress = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { address, city, state, country, pinCode, isDefault } = req.body;
  try {
    validateMongoDbId(userId);
    const newAddress = await Address.create({
      userId: userId,
      address,
      city,
      state,
      country,
      pinCode,
      isDefault,
    });
    res.json(200, { message: "successfully address added" }, newAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to add address" });
  }
});
const editAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  const { address, city, state, country, pinCode, isDefault } = req.body;
  try {
    validateMongoDbId(addressId);

    const updateAddress = await Address.findByIdAndUpdate(
      { _id: addressId },
      {
        updatedAt: Date.now(),
        address,
        city,
        state,
        country,
        pinCode,
        isDefault,
      },
      {
        new: true,
      }
    );

    if (!updateAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(201).json({ message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    validateMongoDbId(userId);
    validateMongoDbId(addressId);

    await Address.findByIdAndDelete({ _id: addressId });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});


const addFavourites = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { product } = req.body;

  try {
    // Validate userId
    validateMongoDbId(userId);

    // Check if the user already has a list of favourites
    let userFavourites = await Favourite.findOne({ userId });

    if (userFavourites) {
      // Check if the product is already in the favourites list
      const productExists = userFavourites.products.some(
        (item) => item.toString() === product.toString()
      );

      if (productExists) {
        return res.status(400).json({ message: "Product already in favourites" });
      }

      // If product is not in the list, add the new product to the list
      userFavourites.products.push(product);
      await userFavourites.save();
      res.json(userFavourites);
    } else {
      // If user does not have a list, create a new one
      const newFavourite = await Favourite.create({
        userId,
        products: [product],
      });
      res.json(newFavourite);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getFavourites = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  

  try {
    validateMongoDbId(userId);
    const favourites = await Favourite.findOne({ userId });
   

    if (!favourites) {
      return res.status(404).json({ message: "Favourites not found" });
    }

    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving favourites",
      error: error.message,
    });
  }
});
const deleteFavourite = asyncHandler(async (req, res) => {
  const {userId}= req.params;
  const { productId } = req.body;
  

  try {
    // Validate MongoDB IDs
    validateMongoDbId(userId);
    validateMongoDbId(productId);

    // Find the favourite document by ID
    const favourite = await Favourite.findOne({userId});

    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }

    // Remove the specified product from the products array
    favourite.products = favourite.products.filter(
      (product) => product.productId.toString() !== productId
    );

    // If there are no more products, delete the favourite document
    if (favourite.products.length === 0) {
      await Favourite.findOneAndDelete({userId});
      return res.json({
        message: "Favourite deleted successfully as it had no more products",
      });
    }

    // Save the updated favourite document
    await favourite.save();

    // Respond with a success message
    res.json({
      message: "Product removed from favourite successfully",
      favourite,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the favourite",
      error: error.message,
    });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    validateMongoDbId(userId);
    const query = { orderBy: userId };

    const ordersDoc = await Order.find(query)
      .sort("-created")
      .populate({
        path: "cart",
        populate: {
          path: "products.product",
          populate: {
            path: "brand",
          },
        },
      })
      .exec();

    return res.json(ordersDoc);
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const getSingleOrder = asyncHandler(async (req, res) => {});
const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findOne({ _id: orderId });
    const foundCart = await Cart.findOne({ _id: order.cart });

    increaseQuantity(foundCart.products);

    await Order.deleteOne({ _id: orderId });
    await Cart.deleteOne({ _id: order.cart });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const createOrder = asyncHandler(async (req, res) => {});

module.exports = {
  getUserInfo,
  editUserInfo,
  addAddress,
  getAddresses,
  getSingleAddress,
  editAddress,
  deleteAddress,
  addFavourites,
  getFavourites,
  deleteFavourite,
  getOrders,
  getSingleOrder,
  cancelOrder,
  createOrder,
};
