const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            color:String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type:Schema.Types.ObjectId,
        ref:"Address"
    },
    paymentIntent: {},
    paymentId: String,
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
          "Not Processed",
          "Cash on Delivery",
          "Processing",
          "Dispatched",
          "Cancelled",
          "Delivered",
        ],
      },
},{timestamps:true})

module.exports = mongoose.model("Order", OrderSchema)


