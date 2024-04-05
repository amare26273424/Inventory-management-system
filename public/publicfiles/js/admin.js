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






















const userhelpshow = document.getElementById("usershow");
const CloseUserHelp = document.getElementById("userhelpremove");

userhelpshow.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "block";
});

CloseUserHelp.addEventListener("click", () => {
  document.getElementById("UserHelp").style.display = "none";
});
// for menubar
const menubar1 = document.getElementById("menubar");
const links1 = document.querySelector(".links");

const x = document.querySelectorAll(".links a");

menubar1.addEventListener("click", () => {
  links1.classList.toggle("addedlink");
  menubar1.classList.toggle("fa-times");
});

x.forEach((x) => {
  x.addEventListener("click", () => {
    links1.classList.toggle("addedlink");
    menubar1.classList.remove("fa-times");
  });
});

function limitOptions(selectElement) {
  var selectedOptions = Array.from(selectElement.selectedOptions);

  if (selectedOptions.length > 2) {
    selectedOptions.slice(2).forEach(function (option) {
      option.selected = false;
    });

    toastr.error("You can only select up to two roles.", "", {
            positionClass: "toast-top-center",
            closeButton: true, // Add a close button
            progressBar: true, // Show a progress bar
            timeOut: 2000, // Set the duration for the message to be displayed
            extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
            css: {
              width: "300px",
              // Set the width of the toastr
              "background-color": "red", // Set the background color

              // Add any other CSS properties as needed
            }
          });
 
  }
}

function validateForm() {
  const password = document.getElementById("password").value;
  const confirmPassword =
    document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert(
      "Passwords do not match. Please make sure the passwords match."
    );
    return false;
  }

  return confirm("Are you sure you want to add the user?");
}

function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the form data based on the input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword =
    document.getElementById("confirmPassword").value;
  const roleOptions = document.querySelectorAll("#role option:checked");
  const role = Array.from(roleOptions).map((option) => option.value);

  // Make an AJAX request to the backend
  // Replace the URL and data with your actual values
  axios
    .post("/adduser", { name, email, password, confirmPassword, role })
    .then((response) => {
      if (response.data.success) {
        toastr.success(response.data.message, "", {
          positionClass: "toast-top-center",
          closeButton: true, // Add a close button
          progressBar: true, // Show a progress bar
          timeOut: 2000, // Set the duration for the message to be displayed
          extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
          css: {
            width: "300px",
            // Set the width of the toastr
            "background-color": "green", // Set the background color

            // Add any other CSS properties as needed
          },
        });
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        toastr.error(response.data.message, "", {
          positionClass: "toast-top-center",
          closeButton: true, // Add a close button
          progressBar: true, // Show a progress bar
          timeOut: 2000, // Set the duration for the message to be displayed
          extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
          css: {
            width: "400px",
            // Set the width of the toastr
            "background-color": "red", // Set the background color

            // Add any other CSS properties as needed
          },
        });
      }
    })
    .catch((error) => {
      toastr.error(error.message, "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        css: {
          width: "300px",
          // Set the width of the toastr
          "background-color": "red", // Set the background color

          // Add any other CSS properties as needed
        },
      });
    });
}

//  functions for logout

function logoutfunction() {
  axios
    .get("/logout")
    .then((res) => {
      window.location.href = "/";
      history.replaceState(null, null, "/");
    })
    .catch(function (error) {
      // Handle any errors that occur during the request
      alert(error.message);
    });
}
