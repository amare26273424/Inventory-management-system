const mongoose = require("mongoose");

const requestschema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "must provide name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "must provide email"],
  },
  pname: {
    type: String,
    trim: true,
    required: [true, "must provide pnume"],
  },
  pnumber: {
    type: Number,
    required: [true, "must provide pnumber"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "must provide descrption"],
  },
  status: {
    type: String,
    trim: true,
    default: "requested",
  },
  typeofproduct: {
    type: String,
    default: "consumable",
  },
  loanDate: {
    type: Date,
    default: () => new Date().toISOString().split("T")[0],
  },
  returnedDate: {
    type: Date,
  },
});

const requestcollection = mongoose.model("request-collection", requestschema);

module.exports = {
  requestcollection,
};
