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

const requestnumber = document.getElementById("pnumber");
const requestproductname = document.getElementById("pname");

function validation(event) {
  event.preventDefault(); // Prevent the default form submission

  axios
    .get(`/productname/${requestproductname.value}`)
    .then((response) => {
      const availableproduct = response.data.pNumber;
      if (requestnumber.value > availableproduct) {
        alert(
          `the requested value is greaterthan avaliable product the avaliable product of  ${requestproductname.value} is ${availableproduct} `
        );
      } else {
        event.target.submit(); // Submit the form if validation passes
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error during validation request:", error);
      alert(
        "the name is not mached to any products please enter the correct name."
      );
    });
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("/request");
    const request = response.data.request;
    console.log(request.length)

    request.forEach((item) => {
      if (item.typeofproduct === "returned" && item.status === "taken") {
        const returnedDate = new Date(item.returnedDate);
        const currentDate = new Date();
        const daysLeft = Math.floor(
          (returnedDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (daysLeft < 0) {
          toastr.error(
            `You have passes ${-daysLeft} days  to return ${item.pname} with ${
              item.pnumber
            } number and you take for ${item.description}`,
            "",
            {
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
            }
          );
        }
      }
    });
  } catch (error) {
    toastr.error(
        error.message,
        "",
        {
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
        }
      );
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
