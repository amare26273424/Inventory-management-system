const mongoose = require("mongoose")
// require('dotenv').config();

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://amarehagos26273424:26273424@mernproject.ww2aaqx.mongodb.net/resultdb?retryWrites=true&w=majority')
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
