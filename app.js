const express = require("express");
const app = express();
const session = require("express-session");
const mongodbsession = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const connectDatabase =require('./configiration/ConnectDb/connectDatabase');
const bodyParser = require("body-parser");
const {
  updateProductreturnedNumber,
  homepage,
  getlogin,
  getallrequests,
 

 
  updateProductNumber,
  getallrequest,
  deleteuser,
  updateuser,
  getoneuser,

  updaterequest,

  
  updatetask,
  adduser,
  login,
  getalluser,
  postrequest,
} = require("./configiration/Controller/tasks");
const { connect } = require("http2");

const product  = require('./configiration/Controller/Product.js');
const user  = require('./configiration/Controller/User.js');

// connect to database
connectDatabase()


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

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.render("index");
  }
};

const isAuthstaff = (req, res, next) => {
  if (req.session.isAuthstaff) {
    next();
  } else {
    res.send("you donot have right to access");
  }
};



app.use(express.static(path.join(__dirname, "views")));



// app.get("/manager", isAuth, (req, res) => {
//   res.render("userpage/manager-page/manager", { roles: `` });
// });

// app.get("/storekeeper", isAuth, (req, res) => {
//   res.render("userpage/storekeeper-page/storekeeper", {
//     roles: "",
//     error: "successfully added",
//   });
// });
// app.get("/admin", isAuth, (req, res) => {
//   res.render("userpage/adminpage/admin", { roles: ``, error: "" });
// });
// // to get the login ejs
// app.get("/login", getlogin);

// app.get("/transaction", isAuth, isAuthstaff, (req, res) => {
//   res.render("userpage/staffmember-page/html/transactions", { error: "" });
// });

// app.get("/alert", isAuth, (req, res) => {
//   res.render("userpage/staffmember-page/html/alert", { error: "" });
// });

// app.get("/requestedtask", isAuth, (req, res) => {
//   res.render("userpage/manager-page/html/requestedtask.ejs");
// });

// app.get("/transactionmanager", isAuth, (req, res) => {
//   res.render("userpage/manager-page/html/transaction");
// });

// app.get("/daily", isAuth, (req, res) => {
//   res.render("userpage/manager-page/html/dailytrasaction");
// });

// app.get("/weekly", isAuth, (req, res) => {
//   res.render("userpage/manager-page/html/weeklytransaction");
// });

// app.get("/edit", isAuth, (req, res) => {
//   res.render("userpage/adminpage/html/edit");
// });

// app.get("/productedit", isAuth, (req, res) => {
//   res.render("userpage/storekeeper-page/html/edit");
// });

// app.get("/admin", isAuth, (req, res) => {
//   res.render("userpage/adminpage/admin");
// });

// app.get("/details", isAuth, (req, res) => {
//   res.render("userpage/details/details");
// });

// app.get("/getstorekepperpage", isAuth, (req, res) => {
//   res.render("userpage/storekeeper-page/storekeeper", {
//     roles: "",
//     error: "product updated successfully",
//   });
// });

// app.get("/recoredtransaction", isAuth, (req, res) => {
//   res.render("userpage/storekeeper-page/html/recoredtransaction");
// });

// app.get("/recoredreturnedproduct", isAuth, (req, res) => {
//   res.render("userpage/storekeeper-page/html/recoredreturnedproduct");
// });

// app.get("/alltransaction", isAuth, (req, res) => {
//   res.render("userpage/adminpage/html/alltransaction");
// });

// app.post('/sendReason',sendemail);

app.use("/", product);
app.use("/", user);


app.get("/requests", getallrequests);


app.post("/adduser", adduser);
app.patch("/productsapproveproduct/:productName", updateProductNumber);
app.patch("/productsreturnedproduct/:productName", updateProductreturnedNumber);


app.post("/login", login);
app.get("/users", getalluser);
app.get("/user/:id", getoneuser);
app.put("/user/:id", updateuser);
app.delete("/deleteuser/:id", deleteuser);
app.get("/request", getallrequest);

app.post("/request", postrequest);
app.patch("/request/:id", updaterequest);

//  app.use(express.static('./public'));

app.listen(5000, () => console.log("server is running on 5000 port"));
