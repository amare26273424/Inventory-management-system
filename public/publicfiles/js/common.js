const menubar1 = document.getElementById("menubar");
const links1 = document.querySelector(".links");
const userhelpshow = document.getElementById("usershow");
const CloseUserHelp = document.getElementById("userhelpremove");

userhelpshow.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "block";
  // Add a class to the body when userhelp is open
  document.body.classList.add("userhelp-open");
});

CloseUserHelp.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "none";
  document.body.classList.remove("userhelp-open");
});

const x = document.querySelectorAll(".links a");

menubar1.addEventListener("click", () => {
  links1.classList.toggle("addedlink");
  menubar1.classList.toggle("fa-times");
});

x.forEach((x) => {
  x.addEventListener("click", () => {
    links1.classList.toggle("addedlink");
    menubar1.classList.remove("fa-times");
  });
});

//  functions for logout

function logoutfunction() {
  axios
    .get("/logout")
    .then((res) => {
      window.location.href = "/";
      history.replaceState(null, null, "/");
    })
    .catch(function (error) {
      // Handle any errors that occur during the request
      alert(error.message);
    });
}

// handling for the showing edit password sections

document
  .getElementById("changepasswordlink")
  .addEventListener("click", function () {
    document.getElementById("Edit-Password-section").style.display = "flex";
  });

document
  .getElementById("editcontainerremove")
  .addEventListener("click", function () {
    document.getElementById("Edit-Password-section").style.display = "none";
  });

//  handling the chnage password

function HandleChangePassword(event) {
  event.preventDefault(); // Prevent the form from submitting by default

  // Get the input values
  let oldPassword = document.getElementById("oldPassword").value;
  let newPassword = document.getElementById("newPassword").value;
  let confirmEditPassword = document.getElementById("confirmEditPassword").value;

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
