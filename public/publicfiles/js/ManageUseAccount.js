// Function to fetch user data and populate the form
async function fetchUser() {
  try {
    const response = await axios.get("/getuser");
    const data = response.data;

    if (data.success) {
      const user = data.user;
      document.getElementById("useremail").value = user.email;
      document.getElementById("username").value = user.name;
    } else {
      console.error("Error fetching user data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
}



// Fetch user data when the page loads
fetchUser();

// Function to handle form submission and update user account
function HandleUpdateAccount(event) {
  event.preventDefault(); // Prevent the form from submitting by default

 

  // Get the input values
  const useremail = document.getElementById("useremail").value;
  const username = document.getElementById("username").value;

  // Check if the passwords match
  if (!useremail || !username) {
    
    toastr.error("please fill all fields", "", {
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
    return;
  }
  axios
    .put("/updateuseraccount", { name:username,email:useremail})
    .then((response) => {
      // Handle the server's response
      toastr.success(response.data.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      });
     
      document.getElementById("Edit-Password-section").style.display = "none";
    })
    .catch((error) => {
      toastr.error(error.response.data.message, "", {
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
}



function HandleChangePassword(event) {
    event.preventDefault(); // Prevent the form from submitting by default
  
    // Get the input values
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmEditPassword = document.getElementById(
      "confirmEditPassword"
    ).value;
  
    // Check if the passwords match
    if (newPassword !== confirmEditPassword) {
      toastr.error("The newpassword is not matched to comfirm password", "", {
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
      return;
    }
    axios
      .put("/update-user-password", { oldPassword, newPassword })
      .then((response) => {
        // Handle the server's response
        toastr.success(response.data.message, "", {
          positionClass: "toast-top-center",
          closeButton: true, // Add a close button
          progressBar: true, // Show a progress bar
          timeOut: 2000, // Set the duration for the message to be displayed
          extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        });
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmEditPassword").value = "";
        document.getElementById("Edit-Password-section").style.display = "none";
      })
      .catch((error) => {
        toastr.error(error.response.data.message, "", {
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
  }



  function toggleDivs() {
    const editSection = document.getElementById("EditSection");
    const resetPassword = document.getElementById("ResetPasword");

    if (editSection.style.display === "none") {
      editSection.style.display = "block";
      resetPassword.style.display = "none";
    } else {
      editSection.style.display = "none";
      resetPassword.style.display = "block";
    }
  }
