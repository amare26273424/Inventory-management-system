const mongoose = require("mongoose");

const logfileSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  user: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  performedBy: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  createdat: {
    type: Date,
    default: () => new Date().toISOString().split("T")[0],
  },
});

const logfilecollection = mongoose.model("logfilecollection", logfileSchema);

module.exports = {
  logfilecollection,
};
