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




const userHelpButton = document.getElementById('UserHelp');

// Add a click event listener to the "User Help" link
userHelpButton.addEventListener('click', downloadUserHelpPDF)


async function downloadUserHelpPDF() {
  try {
    // Get the "User Help" section content
    const userHelpSection = ` 
    <div>
      
      <h1>User Help</h1>
      <p>
        This section provides information and instructions to assist storekeeper
        in effectively utilizing the system.
      </p>

      <h3>1.1 Getting Started</h3>
      <h5>Introduction to the system and its purpose for storekeeper</h5>
      <p>
        Welcome to the AMU ICT Store user help guide for Store Keepers. This guide aims to
        provide you with a comprehensive understanding of the system's purpose and functionality
        to help you efficiently manage products and perform relevant tasks as a Store Keeper.
      </p>

      <p>
        The AMU ICT Store empowers Store Keepers with the ability to add, edit, and delete
        products, as well as manage product deliveries once they have been approved by the
        manager. This system serves as a centralized platform for managing inventory, tracking
        product details, and ensuring smooth product delivery processes.
      </p>

      <h5>Purpose of the System:</h5>
      <p>
        The primary purpose of the AMU ICT Store for Store Keepers is to streamline the
        management of products and facilitate the delivery process. As a Store Keeper, you can
        add new products, update existing product information, delete products if necessary, and
        record product deliveries after they have been approved by the manager.

      </p>

      <p>
        <span style="color: #0082e6; font-size: 18px"> NAVIGATION: </span>To get started with the system as a Store
        Keeper, follow these steps:
      </p>
      <ol>
        <li>Land on the login page of the system.</li>
        <li>Enter your valid username and password.</li>
        <li>
          lick on the "Login" button, and you will be directed to the Store Keeper homepage.
        </li>
      </ol>

      <h5>Overview of User Interface Elements Relevant to Store Keepers:
      </h5>
      <p>
        Once logged in as a Store Keeper, you will have access to the following elements:
      </p>


      <p>
        <span style="color: #0082e6; font-size: 18px"> Dashboard:</span>The dashboard provides an overview of important
        information and quick access
        to key functions for Store Keepers. It may display statistics related to products, pending
        deliveries, or any other relevant data.
      </p>

      <h5>Adding a Product:</h5>
      <p>
        To add a new product to the system, follow these steps:
      </p>
      <ol>
        <li>
          On the Store Keeper dashboard, locate the "Add Product" option.
        </li>
        <li>
          Fill in the required details for the new product, such as product name, description,
          quantity, and any other necessary information.
        </li>
        <li>
          Review the entered information for accuracy.
        </li>
        <li>Submit the form to add the new product to the system.</li>
      </ol>

      <h5>Editing a Product:</h5>
      <p>
        To update or edit an existing product's information, follow these steps:
      </p>
      <ol>
        <li>On the Store Keeper dashboard, navigate to the "Product List" or "Manage Products"
          section</li>
        <li>
          Locate the product you want to edit from the list of available products.
        </li>
        <li>
          Click on the product's name or a designated "Edit" button to access the product details.
        </li>
        <li>Update the necessary information in the provided form fields.</li>
        <li>
          Review the changes for accuracy.
        </li>
        <li>Click on the "Update" or "Save" button to apply the changes to the product.</li>
      </ol>




      <h5>Deleting a Product:</h5>
      <p>
        To remove a product from the system, follow these steps:
      </p>
      <ol>
        <li>On the Store Keeper dashboard, navigate to the "Product List" or "Manage Products"
          section</li>
        <li>
          Locate the product you want to edit from the list of available products.
        </li>
        <li>
          Locate the product you wish to delete from the list </li>

        <li>Click on the product's name or a designated "Delete" button to initiate the deletion
          process.</li>
        <li>
          Confirm the deletion prompt or follow any additional steps as required by the system.

        </li>
        <p>Please note that deleting a product will permanently remove it from the system.</p>
      </ol>




      <h5>Recording Product Delivery:</h5>
      <p>
        To record the delivery of a product after it has been approved by the manager, follow
        these steps:
      </p>
      <ol>
        <li>On the navigation bar, find the option to record product delivery.</li>
        <li>
          Click on the "Record Delivery" option to access the delivery recording page. </li>

        <li>Review the entered information for accuracy.</li>
        <li>

          Click on the taken button to approve the product is taken </li>
      </ol>














      <h3>1.2 Frequently Asked Questions (FAQs) for storekeeper</h3>

      <h5>Q1:How do I add a new product to the system?</h5>

      <p>
        A: To add a new product, log in to the system as a Store Keeper, navigate to the dashboard,
        and locate the "Add Product" option. Click on it, fill in the required details for the new
        product (such as name, description,quantity), review the information, and submit
        the form to add the product to the system.
      </p>

      <h5>Q2:Can I edit the information of an existing product?
      </h5>

      <p>
        A:Yes, as a Store Keeper, you have the ability to edit the information of existing products.
        On the dashboard, find the "Product List" or "Manage Products" section, locate the product
        you want to edit, click on its name or the designated "Edit" button, make the necessary
        changes in the provided form fields, review the updates, and save the changes.
      </p>

      <h5>
        Q3:How can I delete a product from the system?
      </h5>

      <p>
        A:To delete a product, go to the "Product List" or "Manage Products" section on the
        dashboard, find the product you wish to delete, click on its name or the designated
        "Delete" button, and confirm the deletion prompt. Please note that deleting a product will
        permanently remove it from the system.

      </p>


      <h5>
        Q3:How do I record a product delivery?
      </h5>

      <p>
        After a product has been approved by the manager for delivery, you can record the
        delivery in the system. On the navigation bar, look for the option to "Record Delivery."
        Click on it to access the delivery recording page.
        Review the information and click on taken button to record the product delivery.

      </p>



      <h5>
        Q5: Can I view the list of products in the system?
      </h5>

      <p>
        Yes, as a Store Keeper, you can view the list of products. On the dashboard or navigation
        bar, locate the option to "View Products" or "Product List." Click on it to access the
        product listing page, where you can browse through the available products and view their
        details.


      </p>


      <h5>
        Q6: How can I check the quantity of a specific product in the inventory?
      </h5>

      <p>
        To check the quantity of a specific product in the inventory, you can either view the
        product details on the product listing page or search for the product using the search
        functionality, if available. The product information will include the current quantity
        available.


      </p>


      <h5>
        Q6: What should I do if there is a discrepancy between the physical inventory and the system's
        inventory?
      </h5>

      <p>
        If you notice a discrepancy between the physical inventory and the system's inventory, it is
        important to report it to the relevant authority, such as the manager or inventory control
        team. They can investigate and take appropriate actions to reconcile the inventory
        records.


      </p>

      <p>Remember, these FAQs are meant to provide general information, and specific procedures
        may vary based on the system you are using. If you have any further questions or need
        assistance, don't hesitate to seek support from your system administrator or relevant
        personnel.</p>
    </div>
`;

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