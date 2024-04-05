const productsContainer = document.getElementById("productsContainer");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const sortIcon = document.getElementById("sorticon");

const productsPerPage = 5;
let currentPage = 1;
let totalProducts = 0;
let products = [];

async function getProducts() {
  try {
    productsContainer.innerHTML = " <h1>Loading.....</h1>";
    const response = await axios.get("/products");
    products = response.data.products;
    totalProducts = products.length;

    // Sort the products array in reverse order
    products.reverse();

    displayProducts(products.slice(0, productsPerPage));
    setupPagination();
    setupSearch();
  } catch (error) {
    productsContainer.innerHTML = `<h1>${error.message}</h1>`;
  }
}

function displayProducts(products) {
  const productsHTML = products
    .map((product) => {
      const name = product.pName;
      const quantity = product.pNumber;
      const description = product.description;
      const provider = product.Pgiver;
      const addedDate = product.addedDate;
      // const id = product._id;

      return `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${description}</td>          
          <td>${provider}</td>
          <td>${addedDate}</td>
          <td></td> 
        </tr>
      `;
    })
    .join("");

  productsContainer.innerHTML = productsHTML;
}

function setupPagination() {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages > 1) {
    previousBtn.disabled = true;

    nextBtn.addEventListener("click", () => {
      currentPage++;
      previousBtn.disabled = false;

      if (currentPage === totalPages) {
        nextBtn.disabled = true;
      }

      displayProducts(getCurrentPageProducts());
    });

    previousBtn.addEventListener("click", () => {
      currentPage--;
      nextBtn.disabled = false;

      if (currentPage === 1) {
        previousBtn.disabled = true;
      }

      displayProducts(getCurrentPageProducts());
    });
  }
}

function getCurrentPageProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return products.slice(startIndex, endIndex);
}

function setupSearch() {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.pName.toLowerCase().includes(searchTerm)
      );

      displayProducts(filteredProducts.slice(0, productsPerPage));
    } else {
      displayProducts(getCurrentPageProducts());
    }
  });
}

sortIcon.addEventListener("click", () => {
  sortProductsAscending();
});

function sortProductsAscending() {
  products.sort((a, b) => a.pNumber - b.pNumber);
  displayProducts(getCurrentPageProducts());
}

getProducts();
