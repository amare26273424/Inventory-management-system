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
    required: [true, "must provide pnumber"],
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
