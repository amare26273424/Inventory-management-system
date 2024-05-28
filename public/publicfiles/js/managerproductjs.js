const productsContainer = document.getElementById("productsContainer");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const sortIcon = document.getElementById("sorticon");


const productsPerPage = 5;
let currentPage = 1;
let totalProducts = 0;
let products = [];

async function getProducts() {
  try {
    productsContainer.innerHTML = " <h1>Loading.....</h1>";
    const response = await axios.get("/products");
    products = response.data.products;
    totalProducts = products.length;

    // Sort the products array in reverse order
    products.reverse();

    displayProducts(products.slice(0, productsPerPage));
    setupPagination();
    setupSearch();
  } catch (error) {
    productsContainer.innerHTML = `<h1>${error.message}</h1>`;
  }
}

function displayProducts(products) {
  const productsHTML = products
    .map((product) => {
      const name = product.pName;
      const quantity = product.pNumber;
      const description = product.description;
      const provider = product.Pgiver;
      const addedDate = product.addedDate;
      // const id = product._id;

      return `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>${description}</td>          
          <td>${provider}</td>
          <td>${addedDate}</td>
          <td></td> 
        </tr>
      `;
    })
    .join("");

  productsContainer.innerHTML = productsHTML;
}

function setupPagination() {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages > 1) {
    previousBtn.disabled = true;

    nextBtn.addEventListener("click", () => {
      currentPage++;
      previousBtn.disabled = false;

      if (currentPage === totalPages) {
        nextBtn.disabled = true;
      }

      displayProducts(getCurrentPageProducts());
    });

    previousBtn.addEventListener("click", () => {
      currentPage--;
      nextBtn.disabled = false;

      if (currentPage === 1) {
        previousBtn.disabled = true;
      }

      displayProducts(getCurrentPageProducts());
    });
  }
}

function getCurrentPageProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return products.slice(startIndex, endIndex);
}

function setupSearch() {
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.pName.toLowerCase().includes(searchTerm)
      );

      displayProducts(filteredProducts.slice(0, productsPerPage));
    } else {
      displayProducts(getCurrentPageProducts());
    }
  });
}

sortIcon.addEventListener("click", () => {
  sortProductsAscending();
});

function sortProductsAscending() {
  products.sort((a, b) => a.pNumber - b.pNumber);
  displayProducts(getCurrentPageProducts());
}

getProducts();




const userHelpButton = document.getElementById('UserHelp');

// Add a click event listener to the "User Help" link
userHelpButton.addEventListener('click', downloadUserHelpPDF)


async function downloadUserHelpPDF() {
  try {
    // Get the "User Help" section content
    const userHelpSection = `<div style="max-width: 800px; margin: 0 auto;"> <h1 style="color: #0082e6;">User Help</h1> <p> This section provides information and instructions to assist manager in effectively utilizing the system. </p> <h3 style="color: #0082e6;">1.1 Getting Started</h3> <h5 style="color: #333;">Introduction to the system and its purpose for manager</h5> <p> Welcome to the AMU ICT Store user help guide for Managers. This guide aims to provide you with a comprehensive understanding of the system's purpose and functionality to help you effectively manage staff requests, approve or decline them, and access reports for better decision-making. </p>
    <p>
    As a Manager, you have the authority to review and respond to staff
    requests, such as product deliveries, and access reports to monitor
    the store's activities. This system serves as a centralized platform
    for you to oversee operations, make informed decisions, and ensure
    smooth workflow within the store.
  </p>
  
  <h5 style="color: #333;">Purpose of the System:</h5>
  <p>
    The primary purpose of the AMU ICT Store for Managers is to streamline
    the request approval process, provide access to reports, and enable
    effective decision-making. As a Manager, you can review staff
    requests, approve or decline them based on their validity, and access
    daily or weekly reports for better insights into the store's
    activities.
  </p>
  
  <p>
    <span style="color: #0082e6; font-size: 18px"> NAVIGATION: </span>To
    get started with the system as a Manager, follow these steps:
  </p>
  <ol style="list-style-type: decimal; padding-left: 20px;">
    <li>Land on the login page of the system.</li>
    <li>Enter your valid username and password.</li>
    <li>
      Click on the "Login" button, and you will be directed to the
      Manager's homepage.
    </li>
  </ol>
  
  <h5 style="color: #333;">Overview of User Interface Elements Relevant to Managers:</h5>
  <p>
    Once logged in as a Manager, you will have access to the following
    elements
  </p>
  
  <p>
    <span style="color: #0082e6; font-size: 18px"> Dashboard:</span>The
    dashboard provides an overview of important information and quick
    access to key functions for Managers. It may display statistics,
    pending staff requests, or any other relevant data.
  </p>
  
  <h5 style="color: #333;">Approving or Declining Staff Requests:</h5>
  <p>
    To review and respond to staff requests, such as product deliveries,
    follow these steps:
  </p>
  <ol style="list-style-type: decimal; padding-left: 20px;">
    <li>
      Review the list of pending requests, including details such as the
      staff member's name, requested product, quantity, and any additional
      information on Homepage.
    </li>
    <li>
      Based on the validity of the request, click on the designated
      "Approve" or "Decline" button to respond.
    </li>
    <li>
      After responding, the staff member will be notified of the decision.
    </li>
  </ol>
  
  <h5 style="color: #333;">Accessing Daily and Weekly Reports:</h5>
  <p>
    To access daily or weekly reports, providing insights into store
    activities, follow these steps:
  </p>
  <ol style="list-style-type: decimal; padding-left: 20px;">
    <li>On the navigation bar, locate the option to "View Reports"</li>
    <li>
      Hover on the "View Reports" option to access the reports section.
    </li>
    <li>
      Look for the options to generate daily or weekly reports and click
      on the relevant one.
    </li>
    <li>the report will be displayed on the screen, and you can view</li>
    <li>
      Please note that the availability and specific features of reports
      may vary based on the system's configuration and capabilities.
    </li>
  </ol>
  
  <h3 style="color: #0082e6;">1.2 Frequently Asked Questions (FAQs) for manager</h3>
  
  <h5 style="color: #333;">Q1: How do I review and respond to staff requests?</h5>
  
  <p>
    A: To review and respond to staff requests, log in to the system as a
    Manager and navigate to the "Review Requests" or similar section.
    There, you will find a list of pending requests from staff members.
    Review the details of each request, such as the staff member's name,
    requested product, and quantity. Based on the validity of the request,
    click on the designated "Approve" or "Decline" button. If approving,
    you may need to provide additional instructions or information. The
    staff member will be notified of your decision.
  </p>
  
  <h5 style="color: #333;">Q2:How can I access daily and weekly reports?</h5>
  
  <p>
    A: To access daily and weekly reports, log in to the system as a
    Manager and locate the "View Reports" on the navigation bar. Click on
    it to access the reports section. Look for the options to generate
    daily or weekly reports and specify the desired date range for the
    report. you can view.
  </p>
  
  <h5 style="color: #333;">
    Q3:What should I do if a staff member's request seems invalid or
    inappropriate?
  </h5>
  
  <p>
    A:If you come across a staff member's request that appears invalid or
    inappropriate, you should carefully review the details and gather any
    additional information if necessary. If you determine that the request
    is indeed invalid or inappropriate, you can decline the request and
    provide appropriate feedback or instructions to the staff member. It
    is important to maintain clear communication and address any issues
    promptly to ensure smooth operations within the store.
  </p>
  
  <p>
    Remember, these FAQs are intended to provide general information, and
    specific procedures may vary based on the system you are using. If you
    have any further questions or need assistance, don't hesitate to seek
    support from your system administrator or relevant personnel.
  </p>
</div>  
    `;

    const tempContainer = document.createElement("section");
    tempContainer.style.backgroundColor = "#f8f9fa";
    tempContainer.style.padding = "20px";
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