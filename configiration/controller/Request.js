const { requestcollection } = require("../Model/Request");
const sendemail = require('../utils/sendmailer')

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();



// get all request of staff 

router.get("/request", async (req, res) => {
  
  const email = await req.session.email;
  // console.log(email)
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter((item) => item.email === email);
      res.status(201).json({
        success: true,
        request: filteredRequests,
      });
    })
    .catch((err) =>
    res.status(501).json({
      success: false,
      message: err.message,
    })
     );
});


// get all requests 

router.get("/requests", async (req, res) => {
  requestcollection
    .find()
    .then((requests) => {
      res.status(201).json({
        success: true,
        requests: requests,
      });
    })
    .catch((err) => 
    res.status(501).json({
      success: false,
      message: err.message,
    })
    );
});

router.post("/request", async (req, res) => {
  const body = await req.body;
  const email = await req.session.email;
  const name = req.session.name;

  const dataToSend = {
    ...body,
    email: email,
    name: name,
  };

  requestcollection
    .insertMany(dataToSend)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'request sent successfully',
      })
    })
    .catch((err) => {

      res.status(501).json({
        success: false,
        message: err.message,
      })
    
    });
});

router.patch("/request/:id", (req, res) => {
  const id = req.params.id;
  const body = {
    status: req.body.status,
  };
  requestcollection
    .findOneAndUpdate({ _id: id }, body)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'successfully updated',
      })
    })
    .catch((error) => {
      res.status(501).json({
        success: false,
        message: error.message,
      })
    });
});

module.exports = router;
