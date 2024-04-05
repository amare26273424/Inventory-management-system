// Define the necessary variables and elements
const productsContainer = document.getElementById("products");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
let currentPage = 1;
const productsPerPage = 5;
let totalProducts = 0;
let products = [];
let filteredProducts = []; // Declare filteredProducts in the global scope

// Function to fetch and display products with pagination
async function fetchAndDisplayProducts() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get("/dailyrequests");
    products = response.data.dailyrequest.reverse();
    totalProducts = products.length;

    // Filter out products based on loan date and status

    if (products.length === 0) {
      productsContainer.innerHTML = "<h1>No daily transactions</h1>";
      return;
    }
    renderProducts(products, currentPage); // Pass currentPage to renderProducts
    setupPagination(); // Call the setupPagination function
  } catch (error) {toastr.error(error.message, "", {
    positionClass: "toast-bottom-center",
  });
  }
}

// Function to render products with pagination
function renderProducts(products, page) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  const productsHTML = paginatedProducts
    .map((item) => {
      const name = item.name;
      const pname = item.pname;
      const number = item.pnumber;
      const purpose = item.description;
      const typeofproduct = item.typeofproduct;

      const loanDate = new Date(item.loanDate);
      const formattedLoanDate = loanDate.toISOString().split("T")[0];

      return `
      <tr>
        <td>${name}</td>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${typeofproduct}</td>
        <td>${purpose}</td>
        <td>${formattedLoanDate}</td>
      </tr>
    `;
    })
    .join("");

  productsContainer.innerHTML = productsHTML;
}

// Function to set up pagination
function setupPagination() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Use filteredProducts.length

  if (totalPages > 1) {
    previousBtn.disabled = true;

    nextBtn.addEventListener("click", () => {
      currentPage++;
      previousBtn.disabled = false;

      if (currentPage === totalPages) {
        nextBtn.disabled = true;
      }

      renderProducts(filteredProducts, currentPage); // Call renderProducts with the current page
    });

    previousBtn.addEventListener("click", () => {
      currentPage--;
      nextBtn.disabled = false;

      if (currentPage === 1) {
        previousBtn.disabled = true;
      }

      renderProducts(filteredProducts, currentPage); // Call renderProducts with the current page
    });
  }
}

// Fetch and display products with pagination when the page loads
fetchAndDisplayProducts();
