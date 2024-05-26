const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Address Schema
const AddressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  pinCode: {
    type: String
  },
  isDefault: {
    type: Boolean,
    default: false
  },
 
},{timestamps: true});

module.exports = Mongoose.model('Address', AddressSchema);