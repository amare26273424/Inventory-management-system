
window.onload = function(event){
  event.preventDefault();
}

 // Get the error message element


const productsContainer = document.getElementById('products');
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 1;
const productsPerPage = 5; // Change the number of products per page here
let totalProducts = 0;
let products = [];

// Function to fetch and display products for a specific page
async function fetchProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;

  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get('/request');
    products = response.data.request;
    products.reverse()
    totalProducts = products.length;
   
    if(!totalProducts){
    return  productsContainer.innerHTML = "<h1>no transactions</h1>";
    }

    renderProducts();
    setupPagination();
  } catch (error) {
    console.error(error);
  }
}

// Function to render products
function renderProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const displayedProducts = products.slice(start, end);
  
  const productsHTML = displayedProducts.map((item) => {
    const typeofproduct = item.typeofproduct;
    const pname = item.pname;
    const number = item.pnumber;
    const purpose = item.description;
    const status = item.status;
    const loanDate = item.loanDate.slice(0,10);

    return `
      <tr>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${purpose}</td>
        <td>${loanDate}</td>
        <td>${typeofproduct}</td>
        <td>${status}</td>
      </tr>
    `;
  }).join('');

  productsContainer.innerHTML = productsHTML;
}

// Function to set up pagination
function setupPagination() {
  if (currentPage === 1) {
    previousBtn.disabled = true;
  } else {
    previousBtn.disabled = false;
  }

  if (currentPage * productsPerPage >= totalProducts) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// Event listener for next button click
nextBtn.addEventListener('click', () => {
  if (currentPage * productsPerPage < totalProducts) {
    currentPage++;
    fetchProducts();
  }
});

// Event listener for previous button click
previousBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
});

// Initial call to fetch and display products
fetchProducts();
