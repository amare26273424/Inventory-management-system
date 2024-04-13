const mongoose = require("mongoose");

const logfileSchema = new mongoose.Schema({
    status: {
      type: String,
      trim: true,
    },
    doneby: [
      {
        name: {
          type: String,
          trim: true,
         
        },
        email: {
          type: String,
          trim: true,
       
        },
        role: {
          type: String,
        }
      }
    ],
    createdat: {
      type: Date,
      default: () => new Date().toISOString().split("T")[0],
    }
  });

const logfilecollection = mongoose.model("logfilecollection", logfileSchema);

module.exports = {
    logfilecollection,
};
