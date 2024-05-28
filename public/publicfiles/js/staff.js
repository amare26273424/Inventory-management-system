
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
          `You have passed "${-daysLeft} days"  to return  "${item.pname
          }" product with "${item.pnumber}" number and  you take for "${item.description
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
    const userHelpSection = ` <div style="max-width: 800px; margin: 0 auto;"> <h1 style="color: #0082e6;">User Help</h1> <p> This section provides information and instructions to assist Staff in effectively utilizing the system. </p>
    <h3 style="color: #0082e6;">1.1 Getting Started</h3>
<h5 style="color: #333;">Introduction to the system and its purpose for Staff Member</h5>
<p>
  Welcome to the AMU ICT Store user help guide for staff members. This guide
  aims to provide you with a comprehensive understanding of the system's
  purpose and functionality to help you effectively navigate and utilize its
  features.
</p>

<p>
  The AMU ICT Store is designed to streamline the process of managing product
  requests, approvals, and viewing relevant information for staff members
  like yourself. It serves as a centralized platform for requesting products,
  tracking the status of your requests, viewing product details, and
  accessing your previous records.
</p>

<h5 style="color: #333;">Purpose of the System:</h5>
<p>
  The primary purpose of the AMU ICT Store is to facilitate a smooth and
  efficient workflow for staff members when it comes to requesting products
  and managing related processes. With this system, you can easily initiate
  product requests, view the approval or decline status of your requests, and
  access information about available products and your previous records.
</p>

<p>
  <span style="color: #0082e6; font-size: 18px"> NAVIGATION: </span>To
  get started with the system as a Staff, follow these steps:
</p>
<ol style="list-style-type: decimal; padding-left: 20px;">
  <li>Land on the login page of the system.</li>
  <li>Enter your valid username and password.</li>
  <li>
    Click on the "Login" button, and you will be directed to the
    Staff's homepage.
  </li>
</ol>

<h5 style="color: #333;">Overview of User Interface Elements Relevant to Staffs:</h5>
<p>
  Once logged in as a Staff, you will have access to the following
  elements
</p>

<h5 style="color: #333;">Send Request:</h5>
<p>
  To fill and send request form follow th3 steps
</p>
<ol style="list-style-type: decimal; padding-left: 20px;">
  <li>
    On the dashboard or navigation bar, find the option to fill a form.
  </li>
  <li>
    Click on the form option to access the form submission page.
  </li>
  <li>
    Fill in the necessary details as required by the form.
  </li>
  <li>
    Review the form for accuracy and completeness.
  </li>
  <li>
    Submit the form to complete the process.
  </li>
</ol>

<h5 style="color: #333;">Viewing Products:    </h5>
<p>
  To Viewing Products  follow these steps:
</p>
<ol style="list-style-type: decimal; padding-left: 20px;">
  <li>
    On the navigation bar, locate the option to view products.
  </li>
  <li>
    Click on a specific product to view its detailed information.
  </li>
</ol>

<h5 style="color: #333;">Viewing Transactions:</h5>
<p>
  To view transactions follow these steps
</p>
<ol style="list-style-type: decimal; padding-left: 20px;">
  <li>
    On the navigation bar, find the option to view transactions.
  </li>
  <li>
    Click on the transaction option to access the transaction history page.
  </li>
  <li>
    Review the list of transactions and their details.
  </li>
</ol>

<h3 style="color: #0082e6;">1.2 Frequently Asked Questions (FAQs) for Staff</h3>

<h5 style="color: #333;">Q1: How do I access the Store Management System as a staff member?</h5>

<p>
  A:  To access the Store Management System, go to the login page and enter your valid 
  username and password. Click on the Login button to proceed to the system.
</p>

<h5 style="color: #333;">Q2: How can I request a product?</h5>

<p>
  A: To request a product, navigate to the request form within the system. Fill in the 
  required details such as the product name, quantity, and any additional notes or 
  specifications. Submit the form to initiate the product request.
</p>

<h5 style="color: #333;">
  Q3: How can I track the status of my product request?
</h5>

<p>
  A:You can track the status of your product request within the system. Check the relevant 
  section or page where your requests are listed. The system will provide updates on the 
  approval or decline status of your request.
</p>

<h5 style="color: #333;">
  Q4:  Can I view the products available in the store?
</h5>

<p>
  A: Yes, you can view the products available in the store. Use the navigation menu to 
  access the product listing page. Browse through the available products and click on a 
  specific product to view its details such as description, price, and stock availability.
</p>
<h5 style="color: #333;">
  Q5: How can I view my previous records or transaction history?
</h5>

<p>
  A:To view your previous records or transaction history, navigate to the transaction history 
  page or a similar section within the system. You will find a list of your past transactions 
  along with relevant details. You can also apply filters or use the search functionality to 
  find specific transactions if needed.
</p>

<p>
  Remember, these FAQs are intended to provide general information, and
  specific procedures may vary based on the system you are using. If you
  have any further questions or need assistance, don't hesitate to seek
  support from your system administrator or relevant personnel.
</p>
</div>
    `

    const tempContainer = document.createElement("section");
    tempContainer.style.backgroundColor = "#f8f9fa";
    tempContainer.style.padding = "20px";
    tempContainer.innerHTML = `${userHelpSection}`;
    // Use html2pdf to generate and download the PDF
    await html2pdf()
      .from(tempContainer)
      .set({ filename: 'User-Help.pdf' })
      .save();
    alert("User Help PDF download complete!");
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}
