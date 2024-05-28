const userContainer = document.getElementById("usercontainer");
const searchInput = document.getElementById("search");
const productsContainer = document.getElementById("products");


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

 






















// const userhelpshow = document.getElementById("usershow");
// const CloseUserHelp = document.getElementById("userhelpremove");

// userhelpshow.addEventListener("click", () => {
//   document.getElementById("UserHelp").style.display = "block";
//   document.body.classList.add('userhelp-open');
// });

// CloseUserHelp.addEventListener("click", () => {
//   document.getElementById("UserHelp").style.display = "none";
//   document.body.classList.remove('userhelp-open');
// });
// // for menubar
// const menubar1 = document.getElementById("menubar");
// const links1 = document.querySelector(".links");

// const x = document.querySelectorAll(".links a");

// menubar1.addEventListener("click", () => {
//   links1.classList.toggle("addedlink");
//   menubar1.classList.toggle("fa-times");
// });

// x.forEach((x) => {
//   x.addEventListener("click", () => {
//     links1.classList.toggle("addedlink");
//     menubar1.classList.remove("fa-times");
//   });
// });

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
      toastr.error(error.response.data.message, "", {
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




const userHelpButton = document.getElementById('UserHelp');

// Add a click event listener to the "User Help" link
userHelpButton.addEventListener('click', downloadUserHelpPDF)


async function downloadUserHelpPDF() {
  try {
    // Get the "User Help" section content
    const userHelpSection = `<div>
        
    <h1>User Help</h1>
    <p>
      This section provides information and instructions to assist Admin in
      effectively utilizing the system.
    </p>
    <!-- <h2>1. User Role 1: Staff</h2> -->
    <h3>1.1 Getting Started</h3>
    <h5>Introduction to the system and its purpose for Admin</h5>
    <p>
      Welcome to the AMU ICT Store user help guide for Admin. This guide
      aims to provide you with a comprehensive understanding of the system's
      purpose and functionality to help you effectively manage user accounts
      and perform administrative tasks.
    </p>

    <p>
      The AMU ICT Store offers administrative capabilities to streamline
      user management, access control, and system configuration. As an
      admin, you have the authority to add, update, and view user accounts,
      ensuring that the system operates smoothly and securely.
    </p>

    <h5>Purpose of the System:</h5>
    <p>
      The primary purpose of the AMU ICT Store for administrators is to
      provide the necessary tools and functionalities to manage user
      accounts, maintain system security, and configure settings. As an
      admin, you can add new users, update user information, and view the
      list of registered users. Additionally, you have the ability to
      perform administrative tasks such as configuring system settings and
      managing access permissions.
    </p>

    <p>
      <span style="color: #0082e6; font-size: 18px"> NAVIGATION: </span>To
      get started with the system as a Manager, follow these steps:
    </p>
    <ol>
      <li>Land on the login page of the system.</li>
      <li>Enter your valid username and password.</li>
      <li>
        you will land on Admin Dashboard Overview of user interface elements
        relevant to Admin.
      </li>
    </ol>

    <h5>Overview of User Interface Elements Relevant to Admin:</h5>
    <p>
      Once logged in as a Admin, you will have access to the following
      elements
    </p>
    <!-- <h5>Get Ready:</h5> -->

    <p>
      <span style="color: #0082e6; font-size: 18px"> Dashboard:</span>The
      dashboard provides an overview of important information and quick
      access to key functions for Admin.
    </p>

    <h5>Adding a User:</h5>
    <p>To Add new user follow these steps:</p>
    <ol>
      <li>
        On the dashboard or navigation bar, find the option to add a user.
      </li>
      <li>
        Click on the add user option to access the user creation form.
      </li>
      <li>
        Fill in the required details for the new user, such as username,
        password, role, and any other necessary information.
      </li>
      <li>Review the entered information for accuracy.</li>
      <li>Submit the form to create the new user account.</li>
    </ol>

    <h5>Updating a User:</h5>
    <p>
      To access daily or weekly reports, providing insights into store
      activities, follow these steps:
    </p>
    <ol>
      <li>
        Click on the user list option to access the page displaying all the
        registered users.
      </li>
      <li>Locate the user whose information you want to update</li>
      <li>
        Click on the user's name or a designated "Edit" button to access the
        user details
      </li>
      <li>Update the necessary information in the provided form fields.</li>
      <li>Review the changes for accuracy.</li>
      <li>
        Click on the "Update" or "Save" button to apply the changes to the
        user's profile.
      </li>
    </ol>

    <h5>Viewing Users:</h5>

    <ol>
      <li>
        On the dashboard or navigation bar, find the option to view the list
        of users.
      </li>
      <li>
        Click on the user list option to access the page displaying all the
        registered users.
      </li>
      <li>
        On the user list page, you can view information such as usernames,
        roles, and other relevant details of each user.
      </li>
      <li>
        Utilize filters or search functionality, if available, to find
        specific users based on certain criteria.
      </li>
    </ol>

    <h5>Deleting a User:</h5>

    <ol>
      <li>
        On the dashboard or navigation bar, locate the option to view the
        list of users.
      </li>
      <li>
        Click on the user list option to access the page displaying all the
        registered users.
      </li>
      <li>Locate the user you want to delete from the system.</li>

      <li>
        Click on the user's name or a designated "Delete" button to initiate
        the deletion process
      </li>
      <li>
        Confirm the deletion prompt or follow any additional steps as
        required by the system.
      </li>

      <p>
        Please note that deleting a user account will permanently remove the
        user's access and associated data from the system.
      </p>
    </ol>

    <h3>1.2 Frequently Asked Questions (FAQs) for manager</h3>

    <h5>Q1: How can I add a new user to the Store Management System?</h5>

    <p>
      A: As an admin, you have the authority to add new users to the system.
      To do so, follow these steps: Access the admin panel or dashboard of
      the Store Management System. Look for the "Add User" option, which is
      usually available in the navigation menu or a designated section.
      Click on the "Add User" option to access the user creation form. Fill
      in the required details for the new user, such as username, password,
      role, and any other necessary information. Double-check the entered
      information for accuracy. Click on the "Submit" or "Add User" button
      to create the new user account.
    </p>

    <h5>
      Q2: How can I update user information in the Store Management System?
    </h5>

    <p>
      A: If you need to update user information, including username,
      password, or role, follow these steps: Access the admin panel or
      dashboard of the Store Management System. Navigate to the "User List"
      page or section, usually available in the navigation menu. Locate the
      user whose information you want to update. Click on the user's name or
      a designated "Edit" button to access the user details. Update the
      necessary information in the provided form fields. Review the changes
      for accuracy. Click on the "Update" or "Save" button to apply the
      changes to the user's profile.
    </p>

    <h5>
      Q3: How can I view the list of users in the Store Management System?
    </h5>

    <p>
      A: To view the list of users registered in the system, follow these
      steps: Access the admin panel or dashboard of the Store Management
      System. Look for the "User List" option, usually available in the
      navigation menu or a designated section. Click on the "User List"
      option to access the page displaying all the registered users. On the
      user list page, you can view information such as usernames, roles, and
      other relevant details of each user. Utilize filters or search
      functionality, if available, to find specific users based on certain
      criteria.
    </p>

    <h5>Q4: Can I delete a user account in the Store Management System?</h5>

    <p>
      A: Yes, as an admin, you have the authority to delete user accounts if
      necessary. To delete a user account, follow these steps: Access the
      admin panel or dashboard of the Store Management System. Navigate to
      the "User List" page or section, usually available in the navigation
      menu. Locate the user you want to delete from the system. Click on the
      user's name or a designated "Delete" button to initiate the deletion
      process. Confirm the deletion prompt or follow any additional steps as
      required by the system. Please note that deleting a user account will
      permanently remove the user's access and associated data from the
      system.
    </p>

    <h5>
      Q5: What should I do if I have further questions or issues with user
      management in the system?
    </h5>

    <p>
      A: If you have any additional questions or encounter any issues
      related to user management in the Store Management System, please
      contact the system administrator or the designated support contact
      within your organization. They will be able to provide you with
      further assistance and guidance specific to your system configuration
      and requirements.
    </p>
    <p>
      Remember, these FAQs are intended to provide general information, and
      specific procedures may vary based on the system you are using. If you
      have any further questions or need assistance, don't hesitate to seek
      support from your system administrator or relevant personnel.
    </p>
  </div>`;

    const tempContainer = document.createElement("section");
    tempContainer.innerHTML = `${userHelpSection}`;
    // Use html2pdf to generate and download the PDF
    await html2pdf()
      .from(tempContainer)
      .set({ filename: 'User-Help.pdf' })
      .save();
    alert("User Help PDF download complete!");
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}