function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    // Get the form data based on the input values
    const pName = document.getElementById('Pname').value;
    const pNumber = document.getElementById('pnumber').value;
    const description = document.getElementById('description').value;
    const Pgiver = document.getElementById('pgiver').value;

    // Make an AJAX request to the backend
    // Replace the URL and data with your actual values
    axios.post('/addproduct', { pName, pNumber, description, Pgiver })
      .then(response => {
        if (response.data.success) {
          toastr.success('product added successfully', "", {
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
            }
          });

          setTimeout(function () {
            location.reload();
          }, 2000);

        } else {

                    toastr.error('product is not added', "", {
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
      })
      .catch(error => {
        
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
            }
          });


      });
  }
