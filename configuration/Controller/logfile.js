const express = require("express");
const app = express();
const { ProductLogFile } = require("../Model/productlogfile");
const { logfilecollection } = require('../Model/Userlogfile');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();
const {isAuthAndActedManager} =  require('../utils/Checkauth')

router.get("/userlogfiles", isAuthAndActedManager , async (req, res) => {
  try {
    const userLogFiles = await logfilecollection.find().populate('performedBy');
    res.status(200).json(userLogFiles); 
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


router.get("/productlogfiles",isAuthAndActedManager ,async (req, res) => {
    try {
      const ProductFile = await ProductLogFile.find().populate('performedBy');      
      res.status(200).json(ProductFile) ;
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  });




module.exports = router;
