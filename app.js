const express = require("express");
const app = express();
const session = require("express-session");
const mongodbsession = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const connectDatabase = require("./configuration/ConnectDb/connectDatabase");
const bodyParser = require("body-parser");
// const {
//   homepage,
//   getlogin,
// } = require("./configiration/Controller/tasks");

const { connect } = require("http2");


const product = require("./configuration/Controller/Product.js");
const user = require("./configuration/Controller/User.js");
const request = require("./configuration/Controller/Request.js");
const logfile = require('./configuration/Controller/logfile')

// connect to database
connectDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware setup
const store = new mongodbsession({
  uri: "mongodb+srv://amarehagos26273424:26273424@mernproject.ww2aaqx.mongodb.net/resultdb?retryWrites=true&w=majority",
  collection: "sessionforstoremanagemnet",
});

app.use(
  session({
    secret: "cockes",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// const isAuth = (req, res, next) => {
//   if (req.session.isAuth) {
//     next();
//   } else {
//     res.render("index");
//   }
// };

// const isAuthstaff = (req, res, next) => {
//   if (req.session.isAuthstaff) {
//     next();
//   } else {
//     res.send("you donot have right to access");
//   }
// };

app.use(express.static(path.join(__dirname, "public")));



app.use("/", product);
app.use("/", user);
app.use("/", request);
app.use("/", logfile);




app.listen(5000, () => console.log("server is running on 5000 port"));
