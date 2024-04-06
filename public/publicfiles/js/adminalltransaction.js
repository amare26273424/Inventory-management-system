const productsContainer = document.getElementById("productsContainer");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const productsPerPage = 7;


let currentPage = 1;
let totalProducts = 0;
let products = [];

async function getProducts() {
  try {
    productsContainer.innerHTML = "<h2>Loading.....</h2>";
    const response = await axios.get("/takenrequests");
    products = response.data.request;
    totalProducts = products.length;
    console.log(totalProducts)
    // Sort the products array in reverse order
    products.reverse();

    displayProducts(products.slice(0, productsPerPage));
    setupPagination();
    setupSearch();
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  const productsHTML = products
    .map((item) => {
      const name = item.name;
      const pname = item.pname;
      const number = item.pnumber;
      const purpose = item.description;
      const typeofproduct = item.typeofproduct;
      const status = item.status;
      const requestId = item._id;
      const loanDate = new Date(item.loanDate);
      const formattedLoanDate = loanDate.toISOString().split("T")[0];

      return `
        <tr>
          <td>${name}</td>
          <td>${pname}</td>
          <td>${number}</td>
          <td>${purpose}</td>
          <td>${formattedLoanDate}</td>
          <td>${typeofproduct}</td>
          <td>${status}</td>
         
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
        product.name.toLowerCase().includes(searchTerm)
      );

      displayProducts(filteredProducts.slice(0, productsPerPage));
    } else {
      displayProducts(getCurrentPageProducts());
    }
  });
}

getProducts();