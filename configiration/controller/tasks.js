const {
  collection,
  usercollection,
  requestcollection,
} = require("../model/db");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// const nodemailer = require('nodemailer');

function getalltasks(req, res) {
  collection
    .find({})
    .then((tasks) => {
      console.log("geted");
      res.send(tasks);
    })
    .catch((err) => res.send(err));
}

const getOnetask = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await collection.findOne({ _id: id });
    if (!result) {
      res.status(404).send("Task not found");
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const getOnetaskbyname = async (req, res) => {
  try {
    const name = req.params.name;
    const result = await collection.findOne({ pName: name });
    if (!result) {
      res.status(404).send("Task not found");
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

async function posttask(req, res) {
  const body = req.body;

  try {
    await collection.insertMany(body);
    res.send({ success: true });
    console.log("Successfully entered");
  } catch (err) {
    res.send({ success: false, message: err.message });
    console.log(err.message);
  }
}

function deleteproduct(req, res) {
  const id = req.params.id;
  collection
    .findOneAndDelete({ _id: id })
    .then(() => {
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
}

async function updateproduct(req, res) {
  const id = await req.params.id;
  const body = await req.body;
  collection
    .findOneAndUpdate({ _id: id }, body)
    .then(() => {
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
}

function updatetask(req, res) {
  const id = req.params.id;
  const body = req.body;
  collection
    .findOneAndUpdate({ _id: id }, body)
    .then(() => {
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
}
///

async function adduser(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await usercollection.findOne({ email });

    if (existingUser) {
      return res.send({
        success: false,
        message: `This email " ${email} " is registred`,
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

    res.send({ success: true });
    console.log(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res
      .status(500)
      .send({
        success: false,
        message: "An error occurred while adding the user",
      });
  }
}

// async function adduser(req, res) {
//   const email = await req.body.email
//   const body = await req.body;

//  const find = await usercollection.findOne({email:email})

//  if(!find)  {

//   usercollection.create(body)
//   .then(() => {
//     res.render('userpage/adminpage/admin',{error:'new user is added',roles:''})
//     console.log('new user entered');
//   })

//  }
// else{

//   res.render('userpage/adminpage/admin',{error:'the email is already registered',roles:""})

// }

function getalluser(req, res) {
  usercollection
    .find({})
    .then((tasks) => {
      console.log("geteduser");
      res.send(tasks);
    })
    .catch((err) => res.send(err));
}

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

    const passwordMatch = await bcrypt.compare(password, user.password);  // Compare hashed password
       if (!passwordMatch) {
        return res.status(201).json({
          success: false,
          message: "incorrect information",
        });
       }

      return res.status(201).json({
        success: true,
        message: "login sucess",
        role:user.role[0],
      }); 


  } catch(error) {
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

async function postrequest(req, res) {
  const body = await req.body;
  const email = await req.session.email;
  const name = req.session.name;

  const dataToSend = {
    ...body,
    email: email,
    name: name,
  };
  console.log(dataToSend);

  requestcollection
    .insertMany(dataToSend)
    .then(() => {
      // res.render('userpage/staffmember-page/html/transactions',{error:'new request addded'});

      res.redirect("/transaction");

      // console.log('Successfully entered');
    })
    .catch((err) => {
      res.send(err.message);
      console.log(err.message);
    });
}

async function getoneuser(req, res) {
  try {
    const id = req.params.id;
    const user = await usercollection.findOne({ _id: id });

    if (user) {
      const decryptedPassword = await bcrypt.compare(
        "plaintextPassword",
        user.password
      );
      user.password = decryptedPassword ? "plaintextPassword" : "********"; // Replace with decrypted password or a placeholder

      res.send(user);
      console.log(user);
    } else {
      console.log("User not found");
      res.send("User not found");
    }
  } catch (error) {
    res.send(error.message);
  }
}

//   async function getoneuser (req, res) {

//     try {
//       const id = req.params.id;
//       const task = await usercollection.findOne({ _id:id });
//       if (task) {
//         res.send(task);
//         console.log(task);
//       } else {
//         console.log('Task not found');
//         res.send('Task not found');
//       }
//     } catch (error) {
//       res.send(error.msg);
//     }

// }

async function updateuser(req, res) {
  const id = req.params.id;
  const { password, ...otherFields } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password

    const updatedUser = { ...otherFields, password: hashedPassword };

    await usercollection.findOneAndUpdate({ _id: id }, updatedUser);

    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user");
  }
}

function deleteuser(req, res) {
  const id = req.params.id;
  usercollection
    .findOneAndDelete({ _id: id })
    .then(() => {
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
}

function updaterequest(req, res) {
  const id = req.params.id;
  const body = {
    status: req.body.status,
  };
  requestcollection
    .findOneAndUpdate({ _id: id }, body)
    .then(() => {
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
}

async function getallrequests(req, res) {
  requestcollection
    .find()
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => res.send(err));
}

async function getallrequest(req, res) {
  const email = await req.session.email;
  requestcollection
    .find()
    .then((tasks) => {
      const filteredRequests = tasks.filter((item) => item.email === email);
      res.send(filteredRequests);
    })
    .catch((err) => res.send(err));
}

async function updateProductNumber(req, res) {
  try {
    const name = await req.params.productName;
    const decreseamount = await req.body.decreaseAmount;
    const task = await collection.findOne({ pName: name });
    const value = task.pNumber - decreseamount;

    collection
      .findOneAndUpdate({ pName: name }, { pNumber: value })
      .then(() => {
        console.log("successfully upddated");
      });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
}

async function updateProductreturnedNumber(req, res) {
  try {
    const name = await req.params.productName;
    const decreseamount = await req.body.decreaseAmount;
    const task = await collection.findOne({ pName: name });
    const value = task.pNumber + decreseamount;

    collection
      .findOneAndUpdate({ pName: name }, { pNumber: value })
      .then(() => {
        console.log("successfully upddated");
      });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
}

// async function sendemail (req, res){

//   const { requestId, reason } = req.body;
//   const  request =await requestcollection.findOne({_id:requestId})
//   const useremail = request.email

//   // Use Nodemailer to send an email to the requester
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'amarehagos26273425@gmail.com',
//       pass: '26273424a'
//     }
//   });

//   let mailOptions = {
//     from: 'amarehagos26273424@gmail.com',
//     to: `amarehagos26273425@gmail.com`, // Replace with actual requester's email
//     subject: 'Task Declined',
//     text: `Your task has been declined. Reason: ${reason}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Failed to send email');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.send('Email sent successfully');
//     }
//   });
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
  getOnetaskbyname,
  updateproduct,
  getalltasks,
  getOnetask,
  posttask,
  deleteproduct,
  adduser,
  login,
  getalluser,
  postrequest,
  getoneuser,
  updateuser,
  deleteuser,
  getallrequest,
  getallrequests,
  updaterequest,
  updateProductNumber,
  getlogin,
  homepage,
  updateProductreturnedNumber,
  //  sendemail
};
