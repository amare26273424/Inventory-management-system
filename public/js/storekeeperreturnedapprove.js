const verify = document.getElementById("verify");

const productsContainer = document.getElementById('products');

// Function to fetch and display products
async function fetchProducts() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get('/requests');
    const products = response.data;
    decreaseAmount= products.pnumber

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}

// Function to handle the click event for the verify button
function handleVerifyClick(requestId, productName,number) {
  if (confirm("Are you sure you want to verify this task?")) {
    updateStatus(requestId, 'returned', "Task has been verified successfully.", productName,number);
  }
}

// Function to update the status and decrease product amount
async function updateStatus(requestId, status, message, productName,number) {
  try {
    const response = await axios.patch(`/request/${requestId}`, { status });
    console.log(response.data);
    alert(message);
    fetchProducts();
    // Decrease the amount of the product based on the product name
    await axios.patch(`/productsreturnedproduct/${productName}`, { decreaseAmount: number});

    // Refresh the products after updating the status and decreasing the amount
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
}

// Function to render products
function renderProducts(products) {
  const unverifiedProducts = products.filter((item) => item.status == 'taken' && item.typeofproduct =='returned');

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
    
        <td><button onClick='handleVerifyClick("${requestId}", "${pname}","${number}")' class='verfiybtn'>verify</button></td>
      
      </tr>
    `;
  }).join('');

  productsContainer.innerHTML = productsHTML;
}

// Fetch and display products on page load
fetchProducts();

