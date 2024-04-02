const userContainer = document.getElementById("usercontainer");
const searchInput = document.getElementById("search");
const productsContainer = document.getElementById("products");
const userlistbtn = document.getElementById("userlistbtn");

let currentPage = 1;
const productsPerPage = 5;
let products = [];

async function fetchData() {
  productsContainer.innerHTML = "<h1>Loading...</h1>";

  try {
    const response = await axios.get("/users");
    products = response.data.users.reverse();
    renderProducts(products, currentPage);
    setupPagination(products);
  } catch (error) {
   
    productsContainer.innerHTML = `<h1>Error loading data  b/c of ${error.message}</h1>`;
  }
}

function updateProductList() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((item) => {
    const name = item.name.toLowerCase();
    return name.includes(searchTerm);
  });

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML =
      "<tr><td colspan='4'>User Not Found</td></tr>";
  } else {
    renderProducts(filteredProducts, currentPage);
    setupPagination(filteredProducts);
  }
}

function renderProducts(products, page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const pageProducts = products.slice(startIndex, endIndex);

  const productsHTML = pageProducts
    .map((item) => {
      const { name, email, password, role, _id: id } = item;
      return `
      <tr>
        <td>${name}</td>
        <td>${email}</td>       
        <td>${role}</td>
        <td>
          <a href="./html/edit.html?id=${id}" style="margin-right:18px">
            <i class="fas fa-edit"></i>
          </a>

          <span style="color:#008888" onclick="confirmDelete('${id}','${name}')">
            <i class="fas fa-trash"></i>
          </span>
        </td>
      </tr>
    `;
    })
    .join("");

  productsContainer.innerHTML = productsHTML;
}


function confirmDelete(userId,name) {
  const userName = prompt("Please enter the name of the user to confirm deletion:");
  if (userName === name)  
       {
        axios
        .delete(`/deleteuser/${userId}`)
        .then((response) => {
          if (response.data.success) {
            toastr.success(response.data.message, "", {
              positionClass: "toast-top-center",
              closeButton: true,
              progressBar: true,
              timeOut: 2000,
              extendedTimeOut: 1000,
              css: {
                width: "300px",
                "background-color": "green",
              }
            });
            fetchData();
          }
        })
        .catch((error) => {
          toastr.error(error.message, "", {
            positionClass: "toast-top-center",
            closeButton: true,
            progressBar: true,
            timeOut: 2000,
            extendedTimeOut: 1000,
            css: {
              width: "300px",
              "background-color": "green",
            }
          });
        });
       }
       else {

        toastr.error('User name does not match ', "", {
          positionClass: "toast-top-center",
          closeButton: true,
          progressBar: true,
          timeOut: 2000,
          extendedTimeOut: 1000,
          css: {
            width: "300px",
            "background-color": "green",
          }
        });
          
        }
     
}


function setupPagination(products) {
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (totalPages > 1) {
    previousBtn.disabled = true;

    nextBtn.addEventListener("click", () => {
      currentPage++;
      previousBtn.disabled = false;

      if (currentPage === totalPages) {
        nextBtn.disabled = true;
      }

      renderProducts(products, currentPage);
    });

    previousBtn.addEventListener("click", () => {
      currentPage--;
      nextBtn.disabled = false;

      if (currentPage === 1) {
        previousBtn.disabled = true;
      }

      renderProducts(products, currentPage);
    });
  }
}

function init() {
  fetchData();

  searchInput.addEventListener("input", updateProductList);
}

init();

document.getElementById("showPassword").addEventListener("click", function () {
  var passwordInput = document.querySelector(".addpassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    this.innerHTML = '<i class="fas fa-eye"></i>';
  }
});

document
  .getElementById("showConfirmPassword")
  .addEventListener("click", function () {
    var confirmPasswordInput = document.querySelector("#confirmPassword");
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      this.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      confirmPasswordInput.type = "password";
      this.innerHTML = '<i class="fas fa-eye"></i>';
    }
  });

userlistbtn.addEventListener("click", () => {
  document.getElementById("product").classList.toggle("addeduserlist");
});
