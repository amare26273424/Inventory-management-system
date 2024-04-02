const { usercollection } = require("../Model/User");
const { requestcollection } = require("../Model/Request");
const { collection } = require("../Model/Product");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();


