
const verify = document.getElementById("verify");
const decline = document.getElementById("decline");
const productsContainer = document.getElementById('products');

// Function to fetch and display products
async function fetchProducts() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get('http://127.0.0.1:5000/request');
    const products = response.data;

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}

// Function to handle the click event for the verify button
function handleVerifyClick(requestId) {
  if (confirm("Are you sure you want to verify this task?")) {
    updateStatus(requestId, 'verfiy', "Task has been verified successfully.");
  }
}

// Function to handle the click event for the decline button
function handleDeclineClick(requestId) {
  if (confirm("Are you sure you want to decline this task?")) {
    updateStatus(requestId, 'decline', "Task has been declined successfully.");
  }
}

// Function to update the status
async function updateStatus(requestId, status, message) {
  try {
    const response = await axios.patch(`/request/${requestId}`, { status });
    console.log(response.data);
    alert(message);
    // Refresh the products after updating the status
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// Function to render products
function renderProducts(products) {
  const unverifiedProducts = products.filter((item) => item.status == 'pending');

  if (unverifiedProducts.length === 0) {
    productsContainer.innerHTML = "<h1>No unverified tasks</h1>";
    return;
  }

  const productsHTML = unverifiedProducts.map((item) => {
    const name = item.name;
    const pname = item.pname;
    const number = item.pnumber;
    const purpose = item.description;
    const status = item.status;
    const requestId = item._id;

    return `
      <tr>
        <td>${name}</td>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${purpose}</td>
    
        <td><button onClick='handleVerifyClick("${requestId}")'  class='verfiybtn'>verify</button></td>
        <td><button onClick='handleDeclineClick("${requestId}")'  class='declinebtn'>decline</button></td>
      </tr>
    `;
  }).join('');

  productsContainer.innerHTML = productsHTML;
}

// Fetch and display products when the page loads
fetchProducts();
