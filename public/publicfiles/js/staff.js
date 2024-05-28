
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
          document.getElementById("submitBtn").disabled = false;
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
      const daysLeft = Math.ceil(
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
            timeOut: 10000, // Set the duration for the message to be displayed
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

// Set the minimum date for the input field to today
const returnedDateInput = document.getElementById("returnedDate");
returnedDateInput.min = new Date().toISOString().split("T")[0];







// Get the 'pname' input field
const pnameInput = document.getElementById('pname');

// Add an event listener for the 'focus' event on the 'pname' input field
pnameInput.addEventListener('focus', handlePnameFieldFocus);

// Flag to track whether the alert has been shown
let alertShown = false;

function handlePnameFieldFocus() {
  // Check if the 'pname' input field is empty and the alert hasn't been shown yet
  if (pnameInput.value.trim() === '' && !alertShown) {
    // Alert the user to double-click the product list
    alert('Please double-click the product list to fill the product name.');

    // Set the flag to true to prevent the alert from being shown again
    alertShown = true;

    // Scroll to the product list section
    document.getElementById('#product').scrollIntoView({ behavior: 'smooth' });
  }
}







const userHelpButton = document.getElementById('UserHelp');

// Add a click event listener to the "User Help" link
userHelpButton.addEventListener('click', downloadUserHelpPDF)


async function downloadUserHelpPDF() {
  try {
    // Get the "User Help" section content
    const userHelpSection = ` <div>
     
    <h1>User Help</h1>
    <p>
      This section provides information and instructions to assist manager
      in effectively utilizing the system.
    </p>
    <!-- <h2>1. User Role 1: Staff</h2> -->
    <h3>1.1 Getting Started</h3>
    <h5>Introduction to the system and its purpose for manager</h5>
    <p>
      Welcome to the AMU ICT Store user help guide for Managers. This guide
      aims to provide you with a comprehensive understanding of the system's
      purpose and functionality to help you effectively manage staff
      requests, approve or decline them, and access reports for better
      decision-making.
    </p>

    <p>
      As a Manager, you have the authority to review and respond to staff
      requests, such as product deliveries, and access reports to monitor
      the store's activities. This system serves as a centralized platform
      for you to oversee operations, make informed decisions, and ensure
      smooth workflow within the store.
    </p>

    <h5>Purpose of the System:</h5>
    <p>
      The primary purpose of the AMU ICT Store for Managers is to streamline
      the request approval process, provide access to reports, and enable
      effective decision-making. As a Manager, you can review staff
      requests, approve or decline them based on their validity, and access
      daily or weekly reports for better insights into the store's
      activities.
    </p>

    <p>
      <span style="color: #0082e6; font-size: 18px"> NAVIGATION: </span>To
      get started with the system as a Manager, follow these steps:
    </p>
    <ol>
      <li>Land on the login page of the system.</li>
      <li>Enter your valid username and password.</li>
      <li>
        Click on the "Login" button, and you will be directed to the
        Manager's homepage.
      </li>
    </ol>

    <h5>Overview of User Interface Elements Relevant to Managers:</h5>
    <p>
      Once logged in as a Manager, you will have access to the following
      elements
    </p>
    <!-- <h5>Get Ready:</h5> -->

    <p>
      <span style="color: #0082e6; font-size: 18px"> Dashboard:</span>The
      dashboard provides an overview of important information and quick
      access to key functions for Managers. It may display statistics,
      pending staff requests, or any other relevant data.
    </p>

    <h5>Approving or Declining Staff Requests:</h5>
    <p>
      To review and respond to staff requests, such as product deliveries,
      follow these steps:
    </p>
    <ol>
      <li>
        Review the list of pending requests, including details such as the
        staff member's name, requested product, quantity, and any additional
        information on Homepage.
      </li>
      <li>
        Based on the validity of the request, click on the designated
        "Approve" or "Decline" button to respond.
      </li>
      <li>
        After responding, the staff member will be notified of the decision.
      </li>
    </ol>

    <h5>Accessing Daily and Weekly Reports:</h5>
    <p>
      To access daily or weekly reports, providing insights into store
      activities, follow these steps:
    </p>
    <ol>
      <li>On the navigation bar, locate the option to "View Reports"</li>
      <li>
        Hover on the "View Reports" option to access the reports section.
      </li>
      <li>
        Look for the options to generate daily or weekly reports and click
        on the relevant one.
      </li>
      <li>the report will be displayed on the screen, and you can view</li>
      <li>
        Please note that the availability and specific features of reports
        may vary based on the system's configuration and capabilities.
      </li>
    </ol>

    <h3>1.2 Frequently Asked Questions (FAQs) for manager</h3>

    <h5>Q1: How do I review and respond to staff requests?</h5>

    <p>
      A: To review and respond to staff requests, log in to the system as a
      Manager and navigate to the "Review Requests" or similar section.
      There, you will find a list of pending requests from staff members.
      Review the details of each request, such as the staff member's name,
      requested product, and quantity. Based on the validity of the request,
      click on the designated "Approve" or "Decline" button. If approving,
      you may need to provide additional instructions or information. The
      staff member will be notified of your decision.
    </p>

    <h5>Q2:How can I access daily and weekly reports?</h5>

    <p>
      A: To access daily and weekly reports, log in to the system as a
      Manager and locate the "View Reports" on the navigation bar. Click on
      it to access the reports section. Look for the options to generate
      daily or weekly reports and specify the desired date range for the
      report. you can view.
    </p>

    <h5>
      Q3:What should I do if a staff member's request seems invalid or
      inappropriate?
    </h5>

    <p>
      A:If you come across a staff member's request that appears invalid or
      inappropriate, you should carefully review the details and gather any
      additional information if necessary. If you determine that the request
      is indeed invalid or inappropriate, you can decline the request and
      provide appropriate feedback or instructions to the staff member. It
      is important to maintain clear communication and address any issues
      promptly to ensure smooth operations within the store.
    </p>

    <p>
      Remember, these FAQs are intended to provide general information, and
      specific procedures may vary based on the system you are using. If you
      have any further questions or need assistance, don't hesitate to seek
      support from your system administrator or relevant personnel.
    </p>
  </div>
    `;

    const tempContainer = document.createElement("section");
    tempContainer.innerHTML = `${userHelpSection}`;
     // Use html2pdf to generate and download the PDF
  await  html2pdf()
      .from(tempContainer)
      .set({ filename: 'User-Help.pdf' })
      .save();
      alert("User Help PDF download complete!");
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}
