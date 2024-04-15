const express = require("express");
const app = express();
const { ProductLogFile } = require("../Model/productlogfile");
const { logfilecollection } = require('../Model/Userlogfile');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

router.get("/userlogfiles", async (req, res) => {
  try {
    const userLogFiles = await logfilecollection.find();

    res.status(200).json(userLogFiles);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


router.get("/productlogfiles", async (req, res) => {
    try {
      const ProductFile = await ProductLogFile.find();
      
      res.status(200).json(ProductFile) ;
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  });




module.exports = router;
