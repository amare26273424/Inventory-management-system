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

const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", downloadPDF);
async function downloadPDF() {
  try {
    const response = await axios.get("/takenrequests?limit=0");
    const allProducts = response.data.request;

    // Generate the HTML string for all products, including column names
    const productsHTML = ` <h2>ALL TRANSACTIONS on ${new Date()
      .toISOString()
      .slice(0, 10)} </h2>
      <thead>
        <tr>
          <th>Name of Staff</th>
          <th>Product Name</th>
          <th>Product Number</th>
          <th>Description</th>
          <th>Date</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${allProducts
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
          .join("")}
      </tbody>
    `;

    // Create a temporary container to hold all products
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = `<table>${productsHTML}</table>`;

    // Generate and save the PDF file
    html2pdf()
      .from(tempContainer)
      .set({ filename: "Transaction_list.pdf" })
      .save();
  } catch (error) {
    console.error(error);
  }
}
