const weeklyrequestedElement = document.getElementById('weeklyrequested');
const weeklyproductsrequestedcontainer = document.getElementById('weeklyrequestedproducts');
const previousBtn3 = document.getElementById("previousBtn3");
const nextBtn3 = document.getElementById("nextBtn3");
let currentPage3 = 1;
const productsPerPage3 = 7;
let totalProducts3 = 0;
let products3= [];

async function fetchAndDisplayProducts3() {
  try {
    const response = await axios.get('/weeklyrequests');
    products3 = response.data.weeklyrequests.reverse();

    const numberofconsumbale = products3.filter((item) => {     
      return item.typeofproduct === 'consumable';
    });
    const numberofdeclined = products3.filter((item) => {     
      return item.status.includes("declined");
    });
    const numberofrequested = products3.filter((item) => {     
      return item.status.includes("requested");
    });

    const lengthofconsumble = numberofconsumbale.length;
    totalProducts3 = products3.length;
    const lengthofunapproved = numberofrequested.length
    const lengthofreturnedtype = (totalProducts3) -(lengthofconsumble);
    const lengthofdeclined = numberofdeclined.length;
    const numberofapprovedrequest = (totalProducts3) -(lengthofdeclined)-(lengthofunapproved);

    await updateChart(totalProducts3,lengthofconsumble,lengthofreturnedtype,numberofapprovedrequest,lengthofunapproved,lengthofdeclined);

    if (totalProducts3 === 0) {
      weeklyproductsrequestedcontainer.innerHTML = "<h1>No weekly requested transactions</h1>";
      return;
    }

    renderProductsPage3(currentPage3, products3);
    setupPagination3(products3);
  } catch (error) {
    console.error(error);
  }
}

function renderProductsPage3(page, products) {
  const start = (page - 1) * productsPerPage3;
  const end = start + productsPerPage3;
  const paginatedProducts = products.slice(start, end);
  renderProducts3(paginatedProducts);
}

function renderProducts3(products) {
  const productsHTML3 = products.map((item) => {
    const name = item.name;
    const pname = item.pname;
    const number = item.pnumber;
    const purpose = item.description;
    const typeofproduct = item.typeofproduct;
    const status = item.status;
    const requestId = item._id;
    const loanDate = new Date(item.loanDate);
    const formattedLoanDate = loanDate.toISOString().split('T')[0];

    return `
      <tr>
        <td>${name}</td>
        <td>${pname}</td>
        <td>${number}</td>
        <td>${typeofproduct}</td>
        <td>${status}</td>
        <td>${purpose}</td>
        <td>${formattedLoanDate}</td>
      </tr>
    `;
  }).join('');

  weeklyproductsrequestedcontainer.innerHTML = productsHTML3;
}

function setupPagination3(products) {
  const totalPages = Math.ceil(totalProducts3 / productsPerPage3);

  previousBtn3.addEventListener("click", () => {
    if (currentPage3 > 1) {
      currentPage3--;
      renderProductsPage3(currentPage3, products);
      if (currentPage3 === 1) {
        previousBtn3.disabled = true; // Disable previous button on the first page
      }
      nextBtn3.disabled = false; // Enable next button when navigating away from the last page
    }
  });

  nextBtn3.addEventListener("click", () => {
    if (currentPage3 < totalPages) {
      currentPage3++;
      renderProductsPage3(currentPage3, products);
      if (currentPage3 === totalPages) {
        nextBtn3.disabled = true; // Disable next button on the last page
      }
      previousBtn3.disabled = false; // Enable previous button when navigating away from the first page
    }
  });
}


fetchAndDisplayProducts3();

function updateChart(xx1, xx2,xx3,xx4,xx5,xx6) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Requested', 'consumble', 'returnedtype','approved','Un approved','declined'],
      datasets: [{
        label: 'Transaction Status',
        data: [xx1, xx2, xx3,xx4,xx5,xx6],
        backgroundColor: [
          'blue',
          ' light green',
          'cyan',
          'green',
          'light green',
          'red'
        ],
       
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


const downloadweeklyTransactionBtn = document.getElementById("downloadweeklyTransactionBtn");
downloadweeklyTransactionBtn.addEventListener("click", downloadPDF);


async function downloadPDF() {
  try {
    const response = await axios.get("/weeklyrequests?limit=0");
    const allProducts = response.data.weeklyrequests;

    // Generate the HTML string for all products, including column names
    const productsHTML = `  <h2 style="margin:20px">ALL Weekly Transaction UP to ${new Date()
      .toISOString()
      .slice(0, 10)} </h2>
      <thead>
        <tr style="border-bottom: 1px solid #000;">
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
              <tr  style="border-bottom: 1px solid #000;">
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
    tempContainer.innerHTML = `<table style="border-collapse: collapse">${productsHTML}</table>`;

    // Generate and save the PDF file
    html2pdf()
      .from(tempContainer)
      .set({ filename: 'Weekly Transaction_list.pdf' })
      .save();
  } catch (error) {
    console.error(error);
  }
}