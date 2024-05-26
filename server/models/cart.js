const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    sku: String,
    offerPrice: Number,
    name: String,
    imageUrl: String,
  });

  
const cartSchema = new Schema(
  {
    products: [productSchema],
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cartTotalAmount: Number,
    cartTotalQuantity: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Cart", cartSchema);

