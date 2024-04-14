// const { usercollection } = require("../Model/User");
// const { requestcollection } = require("../Model/Request");
const { collection } = require("../Model/Product");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const { ProductLogFile } = require("../Model/productlogfile");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

router.post("/addproduct", async function (req, res) {
  const bodydata = req.body;

  try {
    const product = new collection(bodydata);
    const logEntry = new ProductLogFile({
      action: "Adding Product",
      product: {
        name: bodydata.pName,
        quantity: bodydata.pNumber,
        description: bodydata.description,
        Pgiver: bodydata.Pgiver,
      },
      performedBy: {
        name: req.session.name,
        email: req.session.email,
      },
    });

    const [savedProduct, savedLog] = await Promise.all([
      product.save(),
      logEntry.save(),
    ]);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the product",
    });
  }
});

router.delete("/deleteproduct/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const deletedProduct = await collection.findOne({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const logEntry = new ProductLogFile({
      action: "Deleting Product",
      product: {
        name: deletedProduct.pName,
        quantity: deletedProduct.pNumber,
        description: deletedProduct.description,
        Pgiver: deletedProduct.Pgiver, // Include other relevant product details here
      },
      performedBy: {
        name: req.session.name, // Assuming you have user session information
        email: req.session.email, // Replace with the actual email of the performer
      },
    });

    await Promise.all([
      collection.deleteOne({ _id: id }),
      logEntry.save(),
    ]);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({
      success: false,
      message: "An error occurred while deleting the product",
      error: error.message,
    });
  }
});

router.put("/product/:id", async function (req, res) {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const product = await collection.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const logEntry = new ProductLogFile({
      action: "Updating Product",
      fromProduct: {
        name: product.pName,
        quantity: product.pNumber,
        description: product.description,
        Pgiver: product.Pgiver,
      },
      product: {
        name: updatedData.pName,
        quantity: updatedData.pNumber,
        description: updatedData.description,
        Pgiver: updatedData.Pgiver,
      },
      performedBy: {
        name: req.session.name, // Assuming you have user session information
        email: req.session.email, // Replace with the actual email of the performer
      },
      timestamp: new Date(),
      changedFields: Object.keys(updatedData),
    });

    product.pName = updatedData.pName;
    product.pNumber = updatedData.pNumber;
    product.description = updatedData.description;
    product.Pgiver = updatedData.Pgiver;

    await Promise.all([product.save(), logEntry.save()]);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
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

    if (!product) {
      return res.status(401).json({
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
      return res.status(404).json({
        success: false,
        message: "product is not exist",
      });
    }

    return res.status(201).json({
      success: true,
      product: product,
    });
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

router.patch(
  "/productsreturnedproduct/:productName",
  async function (req, res) {
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
  }
);

module.exports = router;
