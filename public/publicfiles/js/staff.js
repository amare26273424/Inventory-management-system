// const { default: axios } = require("axios");

const menubar1 = document.getElementById("menubar");
const links1 = document.querySelector(".links");
const userhelpshow = document.getElementById("usershow");
const CloseUserHelp = document.getElementById("userhelpremove");

userhelpshow.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "block";
});

CloseUserHelp.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "none";
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

function validation(event) {
  event.preventDefault();
  const pnameValue = document.getElementById("pname").value;
  const pnumberValue = document.getElementById("pnumber").value;
  const descriptionValue = document.getElementById("Description").value;
  const typeofproductValue = document.getElementById("type").value;
  const returnedDateValue = document.getElementById("returnedDate").value;
  document.getElementById("submitBtn").disabled = true;
  // Log the retrieved values (you can perform further actions here)
  if (pnameValue) {
    axios
      .get(`/productname/${pnameValue}`)
      .then((response) => {
        const availableproduct = response.data.product.pNumber;
        if (pnumberValue > availableproduct) {
          toastr.warning(
            `The requested "${pnameValue}"  product quentitity ${pnumberValue} is greater than the avaliable product quentity ${availableproduct} `,
            "",
            {
              positionClass: "toast-top-center",
              closeButton: true, // Add a close button
              progressBar: true, // Show a progress bar
              timeOut: 2000, // Set the duration for the message to be displayed
              extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
            }
          );
        } else {
          const data = {
            pname: pnameValue,
            pnumber: pnumberValue,
            description: descriptionValue,
            typeofproduct: typeofproductValue,
          };
          if (typeofproductValue === "returned") {
            data.returnedDate = returnedDateValue;
          }
          axios
            .post("/request", data)
            .then((response) => {
              toastr.success(response.data.message, "", {
                positionClass: "toast-top-center",
                closeButton: true, // Add a close button
                progressBar: true, // Show a progress bar
                timeOut: 2000, // Set the duration for the message to be displayed
                extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
              });
            })
            .catch((error) => {
              toastr.error(error.message, "", {
                positionClass: "toast-top-center",
                closeButton: true, // Add a close button
                progressBar: true, // Show a progress bar
                timeOut: 2000, // Set the duration for the message to be displayed
                extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
              });
            })
            .finally(() => {
              // Set the values of the input fields to empty
              document.getElementById("pname").value = "";
              document.getElementById("pnumber").value = "";
              document.getElementById("Description").value = "";
              document.getElementById("returnedDate").value = "";
              document.getElementById("submitBtn").disabled = false;
            });
        }
      })
      .catch((error) => {
        toastr.error(error.message, "", {
          positionClass: "toast-top-center",
          closeButton: true, // Add a close button
          progressBar: true, // Show a progress bar
          timeOut: 2000, // Set the duration for the message to be displayed
          extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        });
        document.getElementById("submitBtn").disabled = false;
      });
  } else {
    toastr.error(
      "please fill product name by double clicking the product list",
      "",
      {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      }
    );

    document.getElementById("submitBtn").disabled = false;
  }
}

// checking the if there is unreturned products

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("/unreturnedproduct");
    const request = response.data.request;

    request.forEach((item) => {
      const returnedDate = new Date(item.returnedDate);
      const currentDate = new Date();
      const daysLeft = Math.floor(
        (returnedDate - currentDate) / (1000 * 60 * 60 * 24)
      );

      if (daysLeft < 0) {
        toastr.warning(
          `You have passed "${-daysLeft} days"  to return  "${
            item.pname
          }" product with "${item.pnumber}" number and  you take for "${
            item.description
          }  reaosn"`,
          "",
          {
            positionClass: "toast-top-center",
            closeButton: true, // Add a close button
            progressBar: true, // Show a progress bar
            timeOut: 2000, // Set the duration for the message to be displayed
            extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
          }
        );
      }
    });
  } catch (error) {
    toastr.error(error.message, "", {
      positionClass: "toast-top-center",
      closeButton: true, // Add a close button
      progressBar: true, // Show a progress bar
      timeOut: 2000, // Set the duration for the message to be displayed
      extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      css: {
        width: "100%",
        // Set the width of the toastr
        "background-color": "red", // Set the background color

        // Add any other CSS properties as needed
      },
    });
  }
});

/*toggle the products*/

document.getElementById("showproduct").addEventListener("click", () => {
  document.getElementById("product").classList.toggle("addproductlist");
});

/* show returned date and loan date for returned */

function toggleDateInputs() {
  var typeSelect = document.getElementById("type");
  var dateInputsContainer = document.getElementById("dateInputsContainer");

  var returnedDateInput = document.getElementById("returnedDate");

  if (typeSelect.value === "returned") {
    dateInputsContainer.style.display = "block";

    returnedDateInput.required = true;
  } else {
    dateInputsContainer.style.display = "none";

    returnedDateInput.required = false;
  }
}

// for the logut
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

// Set the minimum date for the input field to today
const returnedDateInput = document.getElementById("returnedDate");
returnedDateInput.min = new Date().toISOString().split("T")[0];
