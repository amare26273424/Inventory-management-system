const { usercollection } = require("../Model/User");
const { collection } = require("../Model/Product");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const nodemailer = require('nodemailer');

async function login(req, res) {
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
        message: "incorrect information",
      });
    }

    return res.status(201).json({
      success: true,
      message: "login sucess",
      role: user.role[0],
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
}

// async function login(req, res) {
//   try {
//     const { remember,email, password } =await req.body;
//     const user = await usercollection.findOne({ email });

//     if (user)
//      {
//       const passwordMatch = await bcrypt.compare(password, user.password);  // Compare hashed password

//       if (passwordMatch) {
//         req.session.isAuth=true

//         if (remember) {
//           req.session.remember = true;
//           req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Expires in 30 days

//       }

//         req.session.email =await user.email;
//         req.session.name= await user.name ;

//         let roleToLogin = null;
//         let restarray = [];

//         if (Array.isArray(user.role) && user.role.length > 0) {
//           roleToLogin = user.role[0];
//           restarray = user.role.slice(1);

//           if (roleToLogin === 'storekeeper') {
//             req.session.isAuth=3
//             res.render('userpage/storekeeper-page/storekeeper', { roles: `${restarray}`, error: '' });
//           } else if (roleToLogin === 'manager') {
//             req.session.isAuth=2
//             res.render('userpage/manager-page/manager', { roles: `${restarray}` });
//           } else if (roleToLogin === 'staff') {
//             req.session.isAuthstaff= true
//             res.render('userpage/staffmember-page/staff', { roles: `${restarray}` });
//           } else if (roleToLogin === 'admin') {

//             res.render('userpage/adminpage/admin', { roles: `${restarray}`, error: '' });
//           }
//         } else if (typeof user.role === 'string') {
//           roleToLogin = user.role;
//           if (roleToLogin === 'storekeeper') {
//             req.session.isAuth=3
//             res.render('userpage/storekeeper-page/storekeeper', { roles: ``, error: '' });
//           } else if (roleToLogin === 'manager') {
//             req.session.isAuth=2
//             res.render('userpage/manager-page/manager', { roles: `` });
//           } else if (roleToLogin === 'staff') {
//             req.session.isAuth=1
//             res.render('userpage/staffmember-page/staff', { roles: `` });
//           } else if (roleToLogin === 'admin') {
//             req.session.isAuthstaff=true
//             res.render('userpage/adminpage/admin', { roles: ``, error: "" });
//           }
//         }
//       } else {
//         res.render('login/login', { error: "Incorrect password or email" });
//       }
//     } else {
//       res.render('login/login', { error: "Incorrect password or email" });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.send(error.message);
//   }
// }

async function getlogin(req, res) {
  const { email } = req.session;

  if (email) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Expires in 30 days

    try {
      const user = await usercollection.findOne({ email });
      req.session.email = user.email;
      req.session.name = user.name;

      let roleToLogin = null;
      let restarray = [];

      if (Array.isArray(user.role) && user.role.length > 0) {
        roleToLogin = user.role[0];
        restarray = user.role.slice(1);

        if (roleToLogin === "storekeeper") {
          req.session.isAuth = 3;
          res.render("userpage/storekeeper-page/storekeeper", {
            roles: `${restarray}`,
            error: "",
          });
        } else if (roleToLogin === "manager") {
          req.session.isAuth = 2;
          res.render("userpage/manager-page/manager", {
            roles: `${restarray}`,
          });
        } else if (roleToLogin === "staff") {
          req.session.isAuthstaff = true;
          res.render("userpage/staffmember-page/staff", {
            roles: `${restarray}`,
          });
        } else if (roleToLogin === "admin") {
          res.render("userpage/adminpage/admin", {
            roles: `${restarray}`,
            error: "",
          });
        }
      } else if (typeof user.role === "string") {
        roleToLogin = user.role;
        if (roleToLogin === "storekeeper") {
          req.session.isAuth = 3;
          res.render("userpage/storekeeper-page/storekeeper", {
            roles: ``,
            error: "",
          });
        } else if (roleToLogin === "manager") {
          req.session.isAuth = 2;
          res.render("userpage/manager-page/manager", { roles: `` });
        } else if (roleToLogin === "staff") {
          req.session.isAuthstaff = true;
          res.render("userpage/staffmember-page/staff", { roles: `` });
        } else if (roleToLogin === "admin") {
          req.session.isAuth = 4;
          res.render("userpage/adminpage/admin", { roles: ``, error: "" });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  } else {
    res.render("login/login", { error: "" });
  }
}

async function homepage(req, res) {
  const { email } = req.session;

  if (email) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Expires in 30 days

    try {
      const user = await usercollection.findOne({ email });
      req.session.email = user.email;
      req.session.name = user.name;

      let roleToLogin = null;
      let restarray = [];

      if (Array.isArray(user.role) && user.role.length > 0) {
        roleToLogin = user.role[0];
        restarray = user.role.slice(1);

        if (roleToLogin === "storekeeper") {
          req.session.isAuth = 3;
          res.render("userpage/storekeeper-page/storekeeper", {
            roles: `${restarray}`,
            error: "",
          });
        } else if (roleToLogin === "manager") {
          req.session.isAuth = 2;
          res.render("userpage/manager-page/manager", {
            roles: `${restarray}`,
          });
        } else if (roleToLogin === "staff") {
          req.session.isAuthstaff = true;
          res.render("userpage/staffmember-page/staff", {
            roles: `${restarray}`,
          });
        } else if (roleToLogin === "admin") {
          res.render("userpage/adminpage/admin", {
            roles: `${restarray}`,
            error: "",
          });
        }
      } else if (typeof user.role === "string") {
        roleToLogin = user.role;
        if (roleToLogin === "storekeeper") {
          req.session.isAuth = 3;
          res.render("userpage/storekeeper-page/storekeeper", {
            roles: ``,
            error: "",
          });
        } else if (roleToLogin === "manager") {
          req.session.isAuth = 2;
          res.render("userpage/manager-page/manager", { roles: `` });
        } else if (roleToLogin === "staff") {
          req.session.isAuthstaff = true;
          res.render("userpage/staffmember-page/staff", { roles: `` });
        } else if (roleToLogin === "admin") {
          req.session.isAuth = 4;
          res.render("userpage/adminpage/admin", { roles: ``, error: "" });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  } else {
    res.render("index");
  }
}

module.exports = {
  login,
  getlogin,
  homepage,
  //  sendemail
};
