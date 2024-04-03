const { requestcollection } = require("../Model/Request");

const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

router.get("/request", async (req, res) => {
  const email = await req.session.email;
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter((item) => item.email === email);
      res.send(filteredRequests);
    })
    .catch((err) => res.send(err));
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
      console.log("hi");
    })
    .catch((err) => {
      res.send(err.message);
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
      console.log("successfully deleted");
      res.send("successfully deleted");
    })
    .catch((error) => {
      res.send(error.msg);
      console.log(error.msg);
    });
});

module.exports = router;
