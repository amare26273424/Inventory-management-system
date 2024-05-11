const mongoose = require("mongoose");

const productlogfileSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  fromProduct: {
    name: {
      type: String,
      required: false, // Field is optional
      // Field can be null
    },
    quantity: {
      type: Number,
      required: false, // Field is optional
      // Field can be null
    },
    description: {
      type: String,
      required: false, // Field is optional
      // Field can be null
    },
    Pgiver: {
      type: String,
      required: false, // Field is optional
      // Field can be null
    },
  },
  product: {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    Pgiver: {
      type: String,
      required: true,
    },
  },
  performedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-collection',
    required: true
  },  
},
{ timestamps: true }
);

const ProductLogFile = mongoose.model("product-log-file", productlogfileSchema);

module.exports = {
  ProductLogFile,
};
