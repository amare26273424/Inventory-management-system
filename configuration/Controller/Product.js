const { usercollection } = require("../Model/User");
const { requestcollection } = require("../Model/Request");
const { collection } = require("../Model/Product");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

router.post("/addproduct", async function (req, res) {
  const body = req.body;

  try {
  const product =  await collection.insertMany(body);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/deleteproduct/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await collection.findOneAndDelete({ _id: id });
    res.status(201).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/product/:id", async function (req, res) {
  const id = await req.params.id;
  const body = await req.body;
  collection
    .findOneAndUpdate({ _id: id }, body)
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Product updated successfully",
      });
    })
    .catch((error) => {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    });
});

router.get("/products", function (req, res) {
  collection
    .find({})
    .then((products) => {
      res.status(201).json({
        success: true,
        products: products,
      });
    })
    .catch((err) =>
      res.status(201).json({
        success: true,
        message: err.message,
      })
    );
});

router.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const product = await collection.findById(id);

    if (!product ) {
       return  res.status(401).json({
        success: false,
        message: "product is not exist",
      });
    }

      res.status(201).json({
        success: true,
        product: product,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/productname/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const product = await collection.findOne({ pName: name });
    if (!product) {
     return  res.status(404).json({
        success: false,
        message: "product is not exist",
      });
    } 
     
   return   res.status(201).json({
        success: true,
        product: product, 
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.patch("/productsapproveproduct/:productName", async function (req, res) {
  try {
    const name = req.params.productName;
    const decreaseAmount = req.body.decreaseAmount;
    const task = await collection.findOne({ pName: name });
    const value = task.pNumber - decreaseAmount;

    await collection.findOneAndUpdate({ pName: name }, { pNumber: value });
   
    res.status(200).send("Successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// router.patch("/productsreturnedproduct/:productName", async function (req, res) {
//   try {
//     const name = req.params.productName;
//     const increaseAmount = req.body.decreaseAmount;
//     const task = await collection.findOne({ pName: name });
//     const value = task.pNumber + increaseAmount;

//     await collection.findOneAndUpdate({ pName: name }, { pNumber: value });
  
//     res.status(200).send("Successfully updated");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// });

router.patch("/productsreturnedproduct/:productName", async function (req, res) {
  try {
    const name = req.params.productName;
    const increaseAmount = req.body.decreaseAmount; // Assuming it's increaseAmount, not decreaseAmount
    await collection.findOneAndUpdate(
      { pName: name },
      { $inc: { pNumber: increaseAmount } }
    );
  
    res.status(200).send("Successfully updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});



module.exports = router;
