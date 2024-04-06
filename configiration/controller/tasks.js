const { usercollection } = require("../Model/User");


const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const nodemailer = require('nodemailer');



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
 
  getlogin,
  homepage,
  
};
