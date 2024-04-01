const { usercollection } = require("../Model/User");


const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();


// router.post("addproduct", async function (req, res) {
//     const body = req.body;
//     try {
//       await collection.insertMany(body);
//       res.status(201).json({
//         success: true,
//         message: "Product added successfully",
//       });
//     } catch (err) {
//       res.status(401).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   });


  router.get("/logout", (req, res) => {  
    req.session.destroy((error) => {

        res.status(201).json({
            success: true,
            message: "logout successfully",
          });

    });
  });



  module.exports = router;