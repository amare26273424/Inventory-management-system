const { requestcollection } = require("../Model/Request");
const sendemail = require("../utils/sendmailer");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const router = express.Router();

// get all request of staff
router.get("/request", async (req, res) => {
  const email = await req.session.email;
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

// get daily transactions
router.get("/dailyrequests", async (req, res) => {
  requestcollection
    .find()
    .then((requests) => {
      filteredProducts = requests.filter((item) => {
        const now = new Date();
        const loanDate = new Date(item.loanDate);
        const diffInMs = now.getTime() - loanDate.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        return diffInHours < 24;
      });
      res.status(201).json({
        success: true,
        dailyrequest: filteredProducts,
      });
    })
    .catch((err) =>
      res.status(501).json({
        success: false,
        message: err.message,
      })
    );
});

router.get("/weeklyrequests", async (req, res) => {
  requestcollection
    .find()
    .then((requests) => {
      filteredProducts = requests.filter((item) => {
        const now = new Date();
        const loanDate = new Date(item.loanDate);
        const diffInMs = now.getTime() - loanDate.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        return diffInHours < 168;
      });
      res.status(201).json({
        success: true,
        weeklyrequests: filteredProducts,
      });
    })
    .catch((err) =>
      res.status(501).json({
        success: false,
        message: err.message,
      })
    );
});

router.get("/requestedtasks", async (req, res) => {
  requestcollection
    .find()
    .then((requests) => {
      const filteredrequests = requests.filter(
        (request) => request.status === "requested"
      );

      res.status(201).json({
        success: true,
        requestedtasks: filteredrequests,
      });
    })
    .catch((err) =>
      res.status(501).json({
        success: false,
        message: err.message,
      })
    );
});

//get all unreturned    returnedtype of products

router.get("/unreturnedproducts", async (req, res) => {
  // const email = await req.session.email;
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter(
        (item) => item.typeofproduct === "returned" && item.status === "taken"
      );
      res.status(201).json({
        success: true,
        requests: filteredRequests,
      });
    })
    .catch((err) =>
      res.status(501).json({
        success: false,
        message: err.message,
      })
    );
});



// get all approved requests

router.get("/approvedrequests", async (req, res) => {
  // const email = await req.session.email;
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter(
        (item) => item.status === "approved"
      );
      res.status(201).json({
        success: true,
        approvedrequests: filteredRequests,
      });
    })
    .catch((err) =>
      res.status(501).json({
        success: false,
        message: err.message,
      })
    );
});

// get unreturned products  of speciffic  staff
router.get("/unreturnedproduct", async (req, res) => {
  const email = await req.session.email;
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter(
        (item) =>
          item.email === email &&
          item.typeofproduct === "returned" &&
          item.status === "taken"
      );
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


// get unreturned products  of  All staff
router.get("/unreturnedreturnedproduct", async (req, res) => {
  try {
    const requests = await requestcollection.find();

    const filteredRequests = requests.filter((item) => {
      const returnedDate = new Date(item.returnedDate);
      const currentDate = new Date();
      const daysLeft = Math.ceil((returnedDate - currentDate) / (1000 * 60 * 60 * 24));

      return (
        item.typeofproduct === "returned" &&
        item.status === "taken" &&
        daysLeft < 0
      );
    });

    res.status(201).json({
      success: true,
      request: filteredRequests,
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: err.message,
    });
  }
});

// send alert to user to returned product
router.post("/sendalert/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const request = await requestcollection.findOne({ _id: id });

    await sendemail({
      email: request.email,
      subject: "AMU-ICT CENTER: Alert",
      message: `Hello, ${request.name} please return "${request.pname}" product with a quantity of "${request.pnumber}" for "${request.description}" as the return date has passed`,
    });
 
    res.status(201).json({
      success: true,
      message: "alert sent successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
});

// sending request
router.post("/request", async (req, res) => {
  try {
    const body = req.body;
    const email = req.session.email;
    const name = req.session.name;

    const dataToSend = {
      ...body,
      email: email,
      name: name,
    };

    await requestcollection.insertMany(dataToSend);

    res.status(201).json({
      success: true,
      message: "Request sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error.message, // Include the error message for debugging
    });
  }
});

// get all taken requests  for admin

router.get("/takenrequests", async (req, res) => {
  requestcollection
    .find()
    .then((request) => {
      const filteredRequests = request.filter(
        (item) => item.status === "taken" || item.status === "returned"
      );

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

router.patch("/request/:id", (req, res) => {
  const id = req.params.id;
  const body = {
    status: req.body.status,
  };
  requestcollection
    .findOneAndUpdate({ _id: id }, body, { new: true })
    .then((request) => {
      sendemail({
        email: request.email,
        subject: "AMU-ICT CENTER: Status of Request",
        message: `Hello, ${request.name} the request of product "${request.pname}" from Amuict center with quentity of "${request.pnumber}" for "${request.description}" is ${request.status}  requested date on ${request.loanDate} `,
      });

      res.status(201).json({
        success: true,
        message: "successfully updated",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(501).json({
        success: false,
        message: error.message,
      });
    });
});

module.exports = router;
