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
    productsContainer.innerHTML = " <h1>Loading.....</h1>";
    const response = await axios.get("/productlogfiles?limit=0");
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
      .map((product) => {
        const action = product.action;
        const performedByname = product.performedBy.name;
        const performedByemail = product.performedBy.email;
        const productname = product.product.name;
        const productquantity = product.product.quantity;
        const createdat = product.createdAt.slice(0, 10);
  
        if (action === 'Updating Product') { // Use === for comparison
          return `
            <tr>
              <td>${action}</td>
              <td> ${product.fromProduct.name},${' '} ${product.fromProduct.quantity}-To-${productname},${' '} ${productquantity}</td>
              <td>${performedByname},${' '} ${performedByemail}</td>
              <td>${createdat}</td>
            </tr>
          `;
        } else {
          return `
            <tr>
              <td>${action}</td>
              <td>${productname}, ${' '} ${productquantity}</td>
              <td>${performedByname},${' '}  ${performedByemail}</td>
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







const downloaduserlogfileBtn = document.getElementById("downloaduserlogfileBtn");
downloaduserlogfileBtn.addEventListener("click", downloadPDF);


async function downloadPDF() {
  try {
    const response = await axios.get("/productlogfiles?limit=0");
    const allProducts = response.data;

    // Generate the HTML string for all products, including column names
    const productsHTML = `  <h2 style="margin:20px">Product Logfile UP to ${new Date()
      .toISOString()
      .slice(0, 10)} </h2>
      <thead>
        <tr style="border-bottom: 1px solid #000;">
        <th>Action</th>
        <th>Product </th>              
        <th>Performed By</th>
        <th>At</th>
        </tr>
      </thead>
      <tbody>
        ${allProducts
          .map((product) => {
            const action = product.action;
        const performedByname = product.performedBy.name;
        const performedByemail = product.performedBy.email;
        const productname = product.product.name;
        const productquantity = product.product.quantity;
        const createdat = product.createdAt.slice(0, 10);
  
        if (action === 'Updating Product') { // Use === for comparison
          return `
            <tr style="border-bottom: 1px solid #000;">
              <td>${action}</td>
              <td> ${product.fromProduct.name},${' '} ${product.fromProduct.quantity}-To-${productname},${productquantity}</td>
              <td>${performedByname},${' '} ${performedByemail}</td>
              <td>${createdat}</td>
            </tr>
          `;
        } else {
          return `
            <tr  style="border-bottom: 1px solid #000;">
              <td>${action}</td>
              <td>${productname},${' '}  ${productquantity}</td>
              <td>${performedByname},${' '}  ${performedByemail}</td>
              <td>${createdat}</td>
            </tr>
          `;
            }
          })
          .join("")}
      </tbody>
    `;

    // Create a temporary container to hold all products
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = `<table style="border-collapse: collapse">${productsHTML}</table>`;
    // Generate and save the PDF file
    html2pdf()
      .from(tempContainer)
      .set({ filename: 'product-logfile.pdf' })
      .save();
  } catch (error) {
    console.error(error);
  }
}