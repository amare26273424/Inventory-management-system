const productsContainer = document.getElementById("productsContainer");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const productsPerPage = 5;

let currentPage = 1;
let totalProducts = 0;
let products = [];

async function getProducts() {
  try {
    const response = await axios.get("/products");
    products = response.data;
    totalProducts = products.length;

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
    .map((product) => {
      const name = product.pName;
      const id = product._id;
      const quantity = product.pNumber;
      const detail = product.description;
      const addedDate = product.addedDate

      return `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${detail}</td>
          
          <td>
          <a href="/productedit?id=${id}" style="margin-right:18px">
            <i class="fas fa-edit"></i>
          </a>

          <span style="color:#008888" onclick="confirmDelete('${id}')">
            <i class="fas fa-trash"></i>
          </span>
        </td>
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

getProducts();


// deleting the product

function confirmDelete(userId) {
    const confirmation = confirm("Are you sure you want to delete this user?");
    if (confirmation) {
      const productName = prompt("Please enter the name of the product to confirm deletion:");     
      axios.get(`/product/${userId}`)
        .then((response) => {
          const item = response.data;
          if (productName === item.pName) {
            axios.delete(`/deleteproduct/${userId}`)
              .then((response) => {
                alert('Product deleted successfully');
                getProducts();
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            alert('Product name does not match. Deletion canceled.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  