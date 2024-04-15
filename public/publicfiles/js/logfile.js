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
    const response = await axios.get("/userlogfiles");
    products = response.data;
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
      .map((user) => {
        const action = user.action;
        const performedByname = user.performedBy.name;
        const performedByemail = user.performedBy.email;
        const useremail = user.user.email;
        const userrole = user.user.role;
        const createdat = user.createdat.slice(0, 10);
  
        if (action === 'update user') { // Use === for comparison
          return `
            <tr>
              <td>${action}</td>
              <td> ${user.fromuser.name},${user.fromuser.email},${user.fromuser.role}---${user.user.name},${useremail},${userrole}</td>
              <td>${performedByname} -- ${performedByemail}</td>
              <td>${createdat}</td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td>${action}</td>
              <td>${useremail} -- ${userrole}</td>
              <td>${performedByname} -- ${performedByemail}</td>
              <td>${createdat}</td>
            </tr>
          `;
        }
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
        product.action.toLowerCase().includes(searchTerm)
      );

      displayProducts(filteredProducts.slice(0, productsPerPage));
    } else {
      displayProducts(getCurrentPageProducts());
    }
  });
}



getProducts();
