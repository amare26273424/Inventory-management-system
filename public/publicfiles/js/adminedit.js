const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const form = document.getElementById('edit-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role');
const selectedRoles = document.getElementById('selectedRoles');



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




async function fetchUser() {
  try {
    const response = await axios.get(`/user/${userId}`);
    const user = response.data.user;
    console.log(user)
    nameInput.value = user.name;
    emailInput.value = user.email;
    passwordInput.value = user.password;
    selectedRoles.value = user.role;
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(event) {
  event.preventDefault();

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    role: Array.from(roleInput.selectedOptions, option => option.value)
  };

  // Display a confirmation prompt
  const confirmed = confirm('Are you sure you want to update the user?');

  if (confirmed) {
    try {
      await axios.put(`/user/${userId}`, data);
      toastr.success('user updated successfully', "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        css: {
          width: "300px",
          // Set the width of the toastr
          "background-color": 'green', // Set the background color

          // Add any other CSS properties as needed
        }
      });

      setTimeout(function () {
        window.location.href = '/userpage/adminpage/admin.html';
      }, 2000);


    } catch (error) {
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
        }
      });

    }
  }
}



fetchUser();
form.addEventListener('submit', updateUser);



document.getElementById("showPassword").addEventListener("click", function () {
  var passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    this.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    this.innerHTML = '<i class="fas fa-eye"></i>';
  }
});   
