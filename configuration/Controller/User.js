const { usercollection } = require("../Model/User");
const  {logfilecollection} = require('../Model/Userlogfile')
const sendemail = require("../utils/sendmailer");
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
      return res.status(404).json({
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

    const logEntry = new logfilecollection({
      action: 'Adding user',
      user: {
        name: name, // Replace with the actual username
        email: email, // Replace with the actual email
        role:role
      },
      performedBy: {
        name: req.session.name, // Assuming you have user session information
        email: req.session.email // Replace with the actual email of the performer
      }
    });

    const [savedUser, savedLog] = await Promise.all([newUser.save(), logEntry.save()]);

    // Send email notification
    sendemail({
      email: email,
      subject: "AMU-ICT CENTER",
      message: `Hello, ${name}, you have successfully registered to AMU-ICT CENTER`,
    });

    return res.status(200).json({
      success: true,
      message: `New user with email "${email}" has been added successfully`,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the user",
    });
  }
});



router.post("/login", async function (req, res) {
  try {
    const { rememberMe, email, password } = await req.body;
    const user = await usercollection.findOne({ email });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "user not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!passwordMatch) {
      return res.status(201).json({
        success: false,
        message: "please provide correct information",
      });
    }

    if (rememberMe) {
      req.session.remember = true;
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Expires in 30 days
    }

    req.session.email = user.email;
    req.session.name = user.name;

    return res.status(201).json({
      success: true,
      message: "login sucess",
      role: user.role,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/rememberlogin", async function (req, res) {
  try {
    if (req.session.remember) {
      const email = req.session.email;
      const user = await usercollection.findOne({ email });

      return res.status(201).json({
        success: true,
        message: "login sucess",
        role: user.role[0],
      });
    }
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

router.delete("/deleteuser/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const user = await usercollection.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const logEntry = new logfilecollection({
      action: 'delete user',
      user: {
        name: user.name,
        email: user.email,
        role:user.role
      },
      performedBy: {
        name: req.session.name,
        email: req.session.email
      }
    });

    await logEntry.save(); // Save log entry

    // Send email notification
    sendemail({
      email: user.email,
      subject: "Account Deletion Notification",
      message: `Hello, ${user.name}, your account has been deleted from our platform.`,
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
});



router.put("/user/:id", async function (req, res) {
  const id = req.params.id;
  const { password, ...otherFields } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    const updatedUser = { ...otherFields, password: hashedPassword };
    const user = await usercollection.findOneAndUpdate({ _id: id }, updatedUser);

    const logEntry = new logfilecollection({
      action: 'update user',
      fromuser: {
        name: user.name, // Replace with the actual username
        email: user.email ,// Replace with the actual email
        role:user.role
      },
      user: {
        name: updatedUser .name, 
        email: updatedUser .email ,
        role:updatedUser.role
      },
      performedBy: {
        name: req.session.name, // Assuming you have user session information
        email: req.session.email // Replace with the actual email of the performer
      }
    });

    const [updatedUserData, savedLog] = await Promise.all([user.save(), logEntry.save()]);

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


router.put("/update-user-password", async function (req, res) {
  try {
    const email = req.session.email;
    const { oldPassword, newPassword } = req.body;
    const user = await usercollection.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "The old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await usercollection.updateOne(
      { email: email },
      { password: hashedPassword } 
    );

    sendemail({
      email: email,
      subject: "AMU-ICT CENTER: Change-Password",
      message: `Hello, ${user.name}, you have successfully chnaged your password `,
    });



    return res.status(200).json({
      success: true,
      message: "User password updated successfully",
    });
  } catch (error) {
    console.error("Error updating user password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password",
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
