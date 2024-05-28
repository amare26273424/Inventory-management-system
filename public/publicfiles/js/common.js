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

// handling for the showing edit password sections

document
  .getElementById("changepasswordlink")
  .addEventListener("click", function () {
    document.getElementById("Edit-Password-section").style.display = "flex";
  });

document
  .getElementById("editcontainerremove")
  .addEventListener("click", function () {
    document.getElementById("Edit-Password-section").style.display = "none";
  });



