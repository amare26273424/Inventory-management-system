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
    products3 = response.data.weeklyrequests;

    const filteredProducts3 = products3.filter((item) => {
      const now = new Date();
      const loanDate = new Date(item.loanDate);
      const diffInMs = now.getTime() - loanDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      return diffInHours < 168;
    });

    const numberofconsumbale = products3.filter((item) => {     
      return item.typeofproduct === 'consumable';
    });
    const numberofdeclined = products3.filter((item) => {     
      return item.status.includes("declined");
    });

    const lengthofconsumble = numberofconsumbale.length;
    totalProducts3 = filteredProducts3.length;
    const lengthofreturnedtype = (totalProducts3) -(lengthofconsumble);
    const lengthofdeclined = numberofdeclined.length;
    const numberofapprovedrequest = (totalProducts3) -(lengthofdeclined);

    await updateChart(totalProducts3,lengthofconsumble,lengthofreturnedtype,numberofapprovedrequest,lengthofdeclined);

    if (totalProducts3 === 0) {
      weeklyproductsrequestedcontainer.innerHTML = "<h1>No weekly requested transactions</h1>";
      return;
    }

    renderProductsPage3(currentPage3, filteredProducts3);
    setupPagination3(filteredProducts3);
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
    }
  });

  nextBtn3.addEventListener("click", () => {
    if (currentPage3 < totalPages) {
      currentPage3++;
      renderProductsPage3(currentPage3, products);
      previousBtn3.disabled = false;
    }
  });
}

fetchAndDisplayProducts3();

function updateChart(xx1, xx2,xx3,xx4,xx5) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Requested', 'consumble', 'returnedtype','approved','declined'],
      datasets: [{
        label: 'Transaction Status',
        data: [xx1, xx2, xx3,xx4,xx5],
        backgroundColor: [
          'blue',
          ' light green',
          'cyan',
          'green',
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
