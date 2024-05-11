const mongoose = require("mongoose");

const logfileSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  fromuser: {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    role: [
      {
        type: String,
        required: false,
      },
    ],
  },
  user: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    role: [
      {
        type: String,
        trim: true,
        required: [true, "must provide role"],
      },
    ],
  },
  performedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-collection',
    required: true
  }
},
{ timestamps: true }
);

const logfilecollection = mongoose.model("logfilecollection", logfileSchema);

module.exports = {
  logfilecollection,
};
