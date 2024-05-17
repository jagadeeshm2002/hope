const Mongoose = require("mongoose")
const { Schema } = Mongoose;


const CartSchema = new Schema ({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            count: Number,
            price: Number,
            color:String,
        }
    ],
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    cartTotal:{
        type:Number,
    },
    totalAfterDiscount:{
        type:Number,
    }
},{timestamps:true})

module.exports=Mongoose.model("Cart",CartSchema)

