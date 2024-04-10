const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "must provide pname"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "must provide email"],
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Password must be at least 4 characters long"],
  },
  role: [
    {
      type: String,
      trim: true,
      required: [true, "must provide role"],
    },
  ],
});

const usercollection = mongoose.model("user-collection", userschema);

module.exports = {
  usercollection,
};
