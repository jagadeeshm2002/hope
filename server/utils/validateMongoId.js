const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid MongoDB ID: ${id}`);
    error.statusCode = 400; // Bad Request
    throw error;
  }
};

module.exports = validateMongoDbId;
