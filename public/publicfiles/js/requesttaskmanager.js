const requestPreviousBtn = document.getElementById("requestpreviousBtn");
const requestNextBtn = document.getElementById("requestnextBtn");
const requestContainer = document.getElementById("requests");

let requestcurrentPage = 1;
const itemsPerPage = 5; // Number of items to display per page
let requestList = []; // Array to store the list of requests
let totalRequests = 0;
// Function to fetch and display requests for a specific page
// Function to fetch and display requests for a specific page
async function getRequests() {
  try {
    requestContainer.innerHTML = "<h1>Loading...</h1>";
    const response = await axios.get("/requestedtasks");
    requestList = response.data.requestedtasks; // Update the outer requestList variable
    totalRequests = requestList.length;

    if (!requestList || requestList.length === 0) {
      requestContainer.innerHTML = "<h2>No requests found</h2>";
      return;
    }

    displayrequests(requestList.slice(0, itemsPerPage));
    setupRequestPagination();
  } catch (error) {
    console.error(error);
    requestContainer.innerHTML = `<h1>${error.message}</h1>`;
  }
}

// Function to render the list of requests
function displayrequests(requestList) {
  const requestHTML = requestList
    .map((item) => {
      const name = item.name;
      const pname = item.pname;
      const number = item.pnumber;
      const purpose = item.description;
      const date = item.loanDate.slice(0, 10);
      const requestId = item._id;

      return `
      <tr>
        <td>${name}</td>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${purpose}</td>
        <td>${item.typeofproduct}</td>
        <td>${date}</td>
        <td><button onClick='handleVerifyClick("${requestId}")' id='verify-${requestId}' style="background-color:green">verify</button></td>
        <td><button onClick='handleDeclineClick("${requestId}")' id='decline-${requestId}' style="background-color:red">decline</button></td>
      </tr>
    `;
    })
    .join("");

  requestContainer.innerHTML = requestHTML;
}

function setupRequestPagination() {
  const totalrequestedPages = Math.ceil(totalRequests / itemsPerPage);

  if (totalrequestedPages > 1) {
    requestPreviousBtn.disabled = true;

    requestNextBtn.addEventListener("click", () => {
      requestcurrentPage++;
      requestPreviousBtn.disabled = false;

      if (requestcurrentPage === totalrequestedPages) {
        requestNextBtn.disabled = true;
      }

      displayrequests(getCurrentPageRequests());
    });

    requestPreviousBtn.addEventListener("click", () => {
      requestcurrentPage--;
      requestNextBtn.disabled = false;

      if (requestcurrentPage === 1) {
        requestPreviousBtn.disabled = true;
      }

      displayrequests(getCurrentPageRequests());
    });
  }
}

function getCurrentPageRequests() {
  const startIndex = (requestcurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return requestList.slice(startIndex, endIndex);
}

// Fetch and display requests when the page loads
getRequests();

// Function to handle the click event for the verify button
 async function handleVerifyClick(requestId) {
   const verifyBtn = document.getElementById('verify-' + requestId);
   const declineBtn = document.getElementById('decline-' + requestId);

   if (confirm("Are you sure you want to verify this task?")) {
     verifyBtn.disabled = true;  //Disable the verify button
     declineBtn.disabled = true;  //Also disable the decline button
     await axios.patch(`/request/${requestId}`, {status:'approved'}).then(()=>{
      toastr.success('request approved successfully', "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        
      })
      getRequests();
     }).catch((error)=>{
      console.log(error)
      verifyBtn.disabled = false;  //Disable the verify button
     declineBtn.disabled = false; 
      toastr.error(error.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        css: {
          width: "300px",
           // Set the width of the toastr
          "background-color": "green", // Set the background color
       
          // Add any other CSS properties as needed
        }
      });
     })
   }
 }
// Function to handle the click event for the decline button


 async function handleDeclineClick(requestId) {
   const reason = prompt("Please provide a reason for declining this task:");
   if (reason !== null && reason.trim() !== '') { // Check if the reason is not empty
     const verifyBtn = document.getElementById('verify-' + requestId);
     const declineBtn = document.getElementById('decline-' + requestId);
     verifyBtn.disabled = true; // Disable the verify button
     declineBtn.disabled = true;
     await axios.patch(`/request/${requestId}`, {status:`declined b/c of ${reason}` }).then(()=>{
      toastr.success('request declined successfully', "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        
      })
      getRequests();
     }).catch((error)=>{
      toastr.error(error.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        css: {
          width: "300px",
           // Set the width of the toastr
          "background-color": "green", // Set the background color
       
          // Add any other CSS properties as needed
        }
      });
     })
   } else {
    toastr.error('please provide the reason', "", {
      positionClass: "toast-top-center",
      closeButton: true, // Add a close button
      progressBar: true, // Show a progress bar
      timeOut: 2000, // Set the duration for the message to be displayed
      extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      css: {
        width: "300px",
         // Set the width of the toastr
        "background-color": "green", // Set the background color
     
        // Add any other CSS properties as needed
      }
    });
   }
 }

// Function to update the status
// async function updateStatus(requestId, status, message) {
//   try {
//     const response = await axios.patch(`/request/${requestId}`, { status });
//     console.log(response.data);
//     alert(message);
//     // Refresh the request after updating the status
//     fetchrequest();
//   } catch (error) {
//     console.error(error);
//   }
// }
