  // Assuming this code is part of an asynchronous function or a promise chain
  document.addEventListener("DOMContentLoaded", function() {
    axios
      .get("/rememberlogin")
      .then(function (response) {
        console.log(response)
        // Handle the response from the server
        if (response.data.success) {
          if (response.data.role === "manager") {
            window.location.href = "../userpage/manager-page/manager.html";
          } else if (response.data.role === "storekeeper") {
            window.location.href =
              "../userpage/storekeeper-page/storekeeper.html";
          } else if (response.data.role === "staff") {
         
            window.location.href = "../userpage/staffmember-page/staff.html";
          } else {
            window.location.href = "../userpage/adminpage/admin.html";
          }
        } else {
          
          // window.location.href = "./login/login.html";
        }
      })
      .catch(function (error) {
        // Handle errors from the request
        console.error("Error fetching remember login status:", error);
        // Redirect to the login page in case of an error
        
      });
    })
 



function sendData(event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve the individual form field values
  var email = document.getElementById("email").value;
  var password = document.getElementById("pwd").value;
  var rememberMe = document.getElementById("checkbox").checked;

  // Create an object with the form data
  var formData = {
    email: email,
    password: password,
    rememberMe: rememberMe,
  };

  // Send the form data using Axios
  axios
    .post("/login", formData)
    .then(function (response) {
      // Handle the response from the server
      if (response.data.success) {
        if (response.data.role == "manager") {
          window.location.href = "../userpage/manager-page/manager.html";
        } else if (response.data.role == "storekeeper") {
          window.location.href =
            "../userpage/storekeeper-page/storekeeper.html";
        } else if (response.data.role == "staff") {
          window.location.href = "../userpage/staffmember-page/staff.html";
        } else {
          window.location.href = "../userpage/adminpage/admin.html";
        }
      } else {
        toastr.error(response.data.message, "", {
          positionClass: "toast-top-center",
          closeButton: true, // Add a close button
          progressBar: true, // Show a progress bar
          timeOut: 2000, // Set the duration for the message to be displayed
          extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
          css: {
            width: "300px",
            // Set the width of the toastr
            "background-color": "red", // Set the background color

            // Add any other CSS properties as needed
          },
        });
      }
    })
    .catch(function (error) {
      toastr.error(error.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        css: {
          width: "300px",
          // Set the width of the toastr
          "background-color": "red", // Set the background color

          // Add any other CSS properties as needed
        },
      });
    });

  // Return false to prevent the default form submission
  return false;
}

document.getElementById("showPassword").addEventListener("click", function () {
  var passwordInput = document.getElementById("pwd");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    this.innerHTML = '<i class="fas fa-eye"></i>';
  }
});
