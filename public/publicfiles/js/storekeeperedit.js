const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const pname = document.getElementById('name');
const pnumber = document.getElementById('number');
const description = document.getElementById('description');
const Pgiver = document.getElementById('Pgiver');
const addedDate = document.getElementById('addedDate');
async function fetchUser() {
  try {

    const response = await axios.get(`/product/${userId}`);
    const user = response.data.product;
    pname.value = user.pName;
    pnumber.value = user.pNumber;
    description.value = user.description;
    Pgiver.value = user.Pgiver;
  } catch (error) {
    toastr.error(error.message, "", {
      positionClass: "toast-top-center",
    });
  }
}

async function updateUser(event) {
  event.preventDefault();

  if (!pname.value || !pnumber.value || !description.value || !Pgiver.value) {
    return toastr.error('please fill all values', "", {
      positionClass: "toast-top-center",
      closeButton: true, // Add a close button
      progressBar: true, // Show a progress bar
      timeOut: 2000, // Set the duration for the message to be displayed
      extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
      
    });
  }

  if( pnumber.value < 0){
      return toastr.error('the product number is invalid', "", {
        positionClass: "toast-top-center",
        closeButton: true, // Add a close button
        progressBar: true, // Show a progress bar
        timeOut: 2000, // Set the duration for the message to be displayed
        extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
        
      });
  }

  const data = {
    pName: pname.value,
    pNumber: pnumber.value,
    description: description.value,
    Pgiver: Pgiver.value
  };

  

  // Display a confirmation prompt
  const confirmed = confirm('Are you sure you want to update the product?');

  if (confirmed) {
    try {
      await axios.put(`/product/${userId}`, data);
      toastr.success('product is updated successfully', "", {
            positionClass: "toast-top-center",
            closeButton: true, // Add a close button
            progressBar: true, // Show a progress bar
            timeOut: 2000, // Set the duration for the message to be displayed
            extendedTimeOut: 1000, // Set the duration for the message to be displayed after hover
            css: {
              width: "300px",
               // Set the width of the toastr
             // Set the background color
           
              // Add any other CSS properties as needed
            }
          });


      setTimeout(function () {
        window.location.href = '/userpage/storekeeper-page/storekeeper.html';
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
document.getElementById('submitbtn').addEventListener('click', updateUser);


