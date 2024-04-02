const { usercollection } = require("../Model/User");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

router.post("/adduser", async function (req, res) {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await usercollection.findOne({ email });

    if (existingUser) {
      return res.status(201).json({
        success: false,
        message: `This email "${email}" is already registered`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new usercollection({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
    });

    await newUser.save();
    res.status(201).json({
      success: true,
      message: `new user with  this email "${email}" is added successfully`,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/users", function (req, res) {
  usercollection
    .find({})
    .then((users) => {
      res.status(201).json({
        success: true,
        users: users,
      });
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: err.message,
      })
    );
});

router.get("/user/:id", async function (req, res) {
  try {
    const id = req.params.id;

    const user = await usercollection.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const decryptedPassword = await bcrypt.compare(
      "plaintextPassword",
      user.password
    );
    user.password = decryptedPassword ? "plaintextPassword" : "********"; // Replace with decrypted password or a placeholder
    res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/deleteuser/:id", function (req, res) {
  const id = req.params.id;
  usercollection
    .findOneAndDelete({ _id: id })
    .then(() => {
      res.status(201).json({
        success: true,
        message: "user deleted successfully",
      });
    })
    .catch((error) => {
      res.status(501).json({
        success: false,
        message: error.message,
      });
    });
});

router.put("/user/:id", async function (req, res) {
  const id = req.params.id;
  const { password, ...otherFields } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    const updatedUser = { ...otherFields, password: hashedPassword };
    await usercollection.findOneAndUpdate({ _id: id }, updatedUser);

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    res.status(201).json({
      success: true,
      message: "logout successfully",
    });
  });
});

module.exports = router;
