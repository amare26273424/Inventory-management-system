const mongoose = require("mongoose");

const newschema = new mongoose.Schema({
  pName: {
    type: String,
    required: [true, "must provide pname"],
  },
  pNumber: {
    type: Number,
    required: [true, "must provide pnumber"],
  },
  description: {
    type: String,
  },
  Pgiver: {
    type: String,
    required: [true, "must provide pnumber"],
  },
  addedDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

const collection = mongoose.model("store management",newschema)

module.exports = {
    collection,
};
