const verify = document.getElementById("verify");

const productsContainer = document.getElementById('products');

// Function to fetch and display products
async function fetchProducts() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get('/approvedrequests');
    const products = response.data.approvedrequests;
    decreaseAmount= products.pnumber

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}

// Function to handle the click event for the verify button
function handleVerifyClick(requestId, productName,number) {
  if (confirm("Are you sure you want to verify this task?")) {
    updateStatus(requestId, 'taken', "Task has been verified successfully.", productName,number);
  }
}

// Function to update the status and decrease product amount
async function updateStatus(requestId, status, message, productName,number) {
  try {
    const response = await axios.patch(`/request/${requestId}`, { status });
    toastr.success(message, "", {
      positionClass: "toast-bottom-center",
    });
   
    // Decrease the amount of the product based on the product name
    await axios.patch(`/productsapproveproduct/${productName}`, { decreaseAmount: number});

    // Refresh the products after updating the status and decreasing the amount
    fetchProducts();
  } catch (error) {
    toastr.error(error.message, "", {
      positionClass: "toast-bottom-center",
    });
  
  }
}

// Function to render products
function renderProducts(products) {
 
  if (products.length === 0) {
    productsContainer.innerHTML = "<h1>No unverified tasks</h1>";
    return;
  }

  const productsHTML = products.map((item) => {
    const name = item.userId.name;
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

