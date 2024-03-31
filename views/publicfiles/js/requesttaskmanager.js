const requestPreviousBtn = document.getElementById("requestPreviousBtn");
const requestNextBtn = document.getElementById("requestNextBtn");
const requestContainer = document.getElementById('requests');



// Function to fetch and display request
async function fetchrequest() {
  

  try {
    requestContainer.innerHTML = "<h1>Loading...</h1>";
    const response = await axios.get('/requests');
    const request = response.data;
  

    if (!request || request.length === 0) {
      requestContainer.innerHTML = "<h2>No requests found</h2>";
      return;
    }

    renderrequest(request);
  } catch (error) {
    console.error(error);
    requestContainer.innerHTML =  `<h1>${error.message}</h1>` ;
  }
}



// Function to render request
function renderrequest(request) {
  const unverifiedrequest = request.filter((item) => item.status == 'requested');

  if (unverifiedrequest.length === 0) {
    requestContainer.innerHTML = "<h1>No unverified tasks</h1>";
    return;
  }

  const requestHTML = unverifiedrequest.map((item) => {
    const name = item.name;
    const pname = item.pname;
    const number = item.pnumber;
    const purpose = item.description;
    const requestId = item._id;
    

    return `
      <tr>
        <td>${name}</td>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${purpose}</td>
         <td>${item.typeofproduct}</td>
        <td><button onClick='handleVerifyClick("${requestId}")' id='verify-${requestId}'  style=" background-color:green">verify</button></td>
        <td><button onClick='handleDeclineClick("${requestId}")' id='decline-${requestId}'   style="background-color:red">decline</button></td>
      </tr>
    `;
  }).join('');

  requestContainer.innerHTML = requestHTML;
}

// Fetch and display request when the page loads
fetchrequest();






// Function to handle the click event for the verify button
function handleVerifyClick(requestId) {
  const verifyBtn = document.getElementById('verify-' + requestId);
  const declineBtn = document.getElementById('decline-' + requestId);

  if (confirm("Are you sure you want to verify this task?")) {
    updateStatus(requestId, 'pending', "Task has been verified successfully.");
    verifyBtn.disabled = true; // Disable the verify button
    declineBtn.disabled = true; // Also disable the decline button
  }
}

// Function to handle the click event for the decline button
// Function to handle the click event for the decline button
// Function to handle the click event for the decline button
async function handleDeclineClick(requestId) {
  const reason = prompt("Please provide a reason for declining this task:");
  if (reason !== null && reason.trim() !== '') { // Check if the reason is not empty

    const verifyBtn = document.getElementById('verify-' + requestId);
    const declineBtn = document.getElementById('decline-' + requestId);
    verifyBtn.disabled = true; // Disable the verify button
    declineBtn.disabled = true;
   await updateStatus(requestId, `decline b/c of ${reason}`, `Task has been declined. Reason: ${reason}`);
  
  } else if (reason !== null) {
    alert("Reason cannot be empty. Please provide a reason for declining the task.");
  }
}



// Function to update the status
async function updateStatus(requestId, status, message) {
  try {
    const response = await axios.patch(`/request/${requestId}`, { status });
    console.log(response.data);
    alert(message);
    // Refresh the request after updating the status
    fetchrequest();
  } catch (error) {
    console.error(error);
  }
}