const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  offerPrice: Number,
  imageUrl: String,
  slug:String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [productSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favourite", favoriteSchema);
