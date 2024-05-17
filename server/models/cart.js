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
    }
})

module.exports=Mongoose.model("Cart",CartSchema)



//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['active', 'completed', 'canceled'],
//     default: 'active',
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   total: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   products: [],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// }, { timestamps: true })


