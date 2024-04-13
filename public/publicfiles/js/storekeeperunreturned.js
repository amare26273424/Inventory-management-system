
const productsContainer = document.getElementById('products');

// Function to fetch and display products
async function fetchProducts() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get('/unreturnedreturnedproduct');
    const products = response.data.request;
    if (products.length === 0) {
        productsContainer.innerHTML = "<h1>No unverified tasks</h1>";
        return;
      }
    
      const productsHTML = products.map((item) => {
        const name = item.name;
        const pname = item.pname;
        const number = item.pnumber;
        const purpose = item.description;
        const loanDate = item.loanDate.slice(0,10);
        const returnedDate = item.returnedDate.slice(0,10);
        const id = item._id;

        return `
          <tr>
            <td>${name}</td>
            <td>${pname}</td>
            <td>${number}</td>
            <td>${purpose}</td>
            <td>${loanDate}</td>
            <td>${returnedDate}</td>
            <td><button onClick='SendAlert("${id}")' id='sendingalert-${id}' class='declinebtn'>send alert</button></td>
  
           
          </tr>
        `;
      }).join('');
    
      productsContainer.innerHTML = productsHTML;
  } catch (error) {
    console.error(error);
  }
}

// Function to handle the click event for the verify button


// Function to update the status and decrease product amount

// Function to render products
function renderProducts(products) {
 
  
}

// Fetch and display products on page load
fetchProducts();



async function SendAlert(id) {
    const sendingalertBtn = document.getElementById('sendingalert-' + id);
    try {
        sendingalertBtn.disabled = true;
      const response = await axios.post(`/sendalert/${id}`);     
      toastr.success(response.data.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      });
      sendingalertBtn.disabled = false;
    } catch (error) {
        sendingalertBtn.disabled = false;
        toastr.error('Sending alert declined because of ' + error.response.data.message, "", {
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
      
    }
  }