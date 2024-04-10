
// const weeklyElement = document.getElementById('weekly');
const weeklyrequestedElement = document.getElementById('weeklyrequested');
// const weeklydeclinedElement = document.getElementById('weeklydeclined');
// const weeklyapprovedElement = document.getElementById('weeklyapproved');
// const weeklyreturnedElement = document.getElementById('weeklyreturned');

// const weeklyproductscontainer = document.getElementById('weeklyproducts');
 const weeklyproductsrequestedcontainer = document.getElementById('weeklyrequestedproducts');
// const weeklyproductsdeclinedcontainer = document.getElementById('weeklydeclinedproducts');
// const weeklyproductsreturnedcontainer = document.getElementById('weeklyreturnedproducts');
// const weeklyproductsapprovedcontainer = document.getElementById('weeklyapprovedproducts');


// const previousBtn2 = document.getElementById("previousBtn2");
// const nextBtn2 = document.getElementById("nextBtn2");

 const previousBtn3 = document.getElementById("previousBtn3");
 const nextBtn3 = document.getElementById("nextBtn3");

// const previousBtn4 = document.getElementById("previousBtn4");
// const nextBtn4 = document.getElementById("nextBtn4");

// const previousBtn5 = document.getElementById("previousBtn5");
// const nextBtn5 = document.getElementById("nextBtn5");

// const previousBtn6 = document.getElementById("previousBtn6");
// const nextBtn6 = document.getElementById("nextBtn6");


// let currentPage2 = 1;
// const productsPerPage2 = 5;
// let totalProducts2 = 0;
// let products2 = [];

 let currentPage3 = 1;
 const productsPerPage3 = 7;
 let totalProducts3 = 0;
 let products3= [];

// let currentPage4 = 1;
// const productsPerPage4 = 5;
// let totalProducts4 = 0;
// let products4= [];

// let currentPage5 = 1;
// const productsPerPage5 = 5;
// let totalProducts5 = 0;
// let products5 = [];

// let currentPage6 = 1;
// const productsPerPage6 = 5;
// let totalProducts6 = 0;
// let products6 = [];

// async function fetchAndDisplayProducts2() {
//   try {
//     const response = await axios.get('/requests');
//     products2 = response.data.requests;

//     // Filter out products based on loan date and status
//     const filteredProducts2 = products2.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168 && item.status === 'taken';
//     });

//     const filteredProducts1 = products2.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours <= 168;
//     });

//     const filteredProducts4 = products2.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  && item.status !="taken"  && item.status !="returned"  && item.status !="pending"   &&  item.status !="requested";

//     });

//     const filteredProducts5 = products2.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  && item.status ==="pending";

//     });

//     const filteredProducts6 = products2.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  && item.status ==="returned" ;

//     });

//     totalProducts2 = filteredProducts2.length;
     

//     // await updateChart(filteredProducts1.length,totalProducts2,filteredProducts4.length,filteredProducts5.length,filteredProducts6.length)
  

//     if (totalProducts2 === 0) {
//       weeklyproductscontainer.innerHTML = "<h1>No weekly transactions</h1>";
   
//       return;
//     }

//     renderProductsPage2(currentPage2, filteredProducts2);
//     setupPagination2(filteredProducts2);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Function to render products for the current page
// function renderProductsPage2(page, products) {
//   const start = (page - 1) * productsPerPage2;
//   const end = start + productsPerPage2;
//   const paginatedProducts = products.slice(start, end);
//   renderProducts2(paginatedProducts);
// }

// // Function to render products
// function renderProducts2(products) {
//   const productsHTML2 = products.map((item) => {
//     const name = item.name;
//     const pname = item.pname;
//     const number = item.pnumber;
//     const purpose = item.description;
//     const typeofproduct = item.typeofproduct;
//     const status = item.status;
//     const requestId = item._id;
//     const loanDate = new Date(item.loanDate);
//     const formattedLoanDate = loanDate.toISOString().split('T')[0];

//     return `
//       <tr>
//         <td>${name}</td>
//         <td>${pname}</td>
//         <td>${number}</td>
//         <td>${typeofproduct}</td>
//         <td>${purpose}</td>
//         <td>${formattedLoanDate}</td>
//       </tr>
//     `;
//   }).join('');

//   weeklyproductscontainer.innerHTML = productsHTML2;
// }


// // Function to setup pagination// Function to setup pagination
// function setupPagination2(products) {
//   const totalPages = Math.ceil(totalProducts2 / productsPerPage2);

//   previousBtn2.addEventListener("click", () => {
//     if (currentPage2 > 1) {
//       currentPage2--;
//       renderProductsPage2(currentPage2, products);
//     }
//   });

//   nextBtn2.addEventListener("click", () => {
//     if (currentPage2 < totalPages) {
//       currentPage2++;
//       renderProductsPage2(currentPage2, products);
//     }
//   });
// }


// // Fetch and display products with pagination when the page loads
// fetchAndDisplayProducts2();









 async function fetchAndDisplayProducts3() {
   try {
     const response = await axios.get('/weeklyrequests');
     products3 = response.data.weeklyrequests;

     // Filter out products based on loan date and status
     const filteredProducts3 = products3.filter((item) => {
       const now = new Date();
       const loanDate = new Date(item.loanDate);
       const diffInMs = now.getTime() - loanDate.getTime();
       const diffInHours = diffInMs / (1000 * 60 * 60);
       return diffInHours < 168;
     });
     totalProducts3 = filteredProducts3.length;
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

 // Function to render products for the current page
 function renderProductsPage3(page, products) {
   const start = (page - 1) * productsPerPage3;
   const end = start + productsPerPage3;
   const paginatedProducts = products.slice(start, end);
   renderProducts3(paginatedProducts);
 }

 // Function to render products
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


 // Function to setup pagination// Function to setup pagination
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
 // Fetch and display products with pagination when the page loads
 fetchAndDisplayProducts3();









// async function fetchAndDisplayProducts4() {
//   try {
//     const response = await axios.get('/requests');
//     products4 = response.data;

//     // Filter out products based on loan date and status
//     const filteredProducts4 = products4.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  && item.status !="taken"  && item.status !="returned"  && item.status !="pending"   &&  item.status !="requested";
//     });
//     totalProducts4 = filteredProducts4.length;
//     if (totalProducts4 === 0) {
//       weeklyproductsdeclinedcontainer.innerHTML = "<h1>No weekly declined transactions</h1>";
   
//       return;
//     }

//     renderProductsPage4(currentPage4, filteredProducts4);
//     setupPagination4(filteredProducts4);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Function to render products for the current page
// function renderProductsPage4(page, products) {
//   const start = (page - 1) * productsPerPage4;
//   const end = start + productsPerPage4;
//   const paginatedProducts = products.slice(start, end);
//   renderProducts4(paginatedProducts);
// }

// // Function to render products
// function renderProducts4(products) {
//   const productsHTML3 = products.map((item) => {
//     const name = item.name;
//     const pname = item.pname;
//     const number = item.pnumber;
//     const purpose = item.description;
//     const typeofproduct = item.typeofproduct;
//     const status = item.status;
//     const requestId = item._id;
//     const loanDate = new Date(item.loanDate);
//     const formattedLoanDate = loanDate.toISOString().split('T')[0];

//     return `
//       <tr>
//         <td>${name}</td>
//         <td>${pname}</td>
//         <td>${number}</td>
//         <td>${typeofproduct}</td>
//         <td>${purpose}</td>
//         <td>${formattedLoanDate}</td>
//         <td>${status}</td>
//       </tr>
//     `;
//   }).join('');

//   weeklyproductsdeclinedcontainer.innerHTML = productsHTML3;
// }


// // Function to setup pagination// Function to setup pagination
// function setupPagination4(products) {
//   const totalPages = Math.ceil(totalProducts4 / productsPerPage4);

//   previousBtn4.addEventListener("click", () => {
//     if (currentPage4 > 1) {
//       currentPage4--;
//       renderProductsPage4(currentPage4, products);
//     }
//   });

//   nextBtn4.addEventListener("click", () => {
//     if (currentPage4 < totalPages) {
//       currentPage4++;
//       renderProductsPage4(currentPage4, products);
//     }
//   });
// }


// // Fetch and display products with pagination when the page loads
// fetchAndDisplayProducts4();






// async function fetchAndDisplayProducts5() {
//   try {
//     const response = await axios.get('/requests');
//     products5 = response.data;

//     // Filter out products based on loan date and status
//     const filteredProducts5 = products5.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  && item.status ==="pending";
//     })
//     totalProducts5 = filteredProducts5.length;
//     if (totalProducts5 === 0) {
//       weeklyproductsapprovedcontainer.innerHTML = "<h1>No weekly untaken transactions</h1>";
   
//       return;
//     }

//     renderProductsPage5(currentPage5, filteredProducts5);
//     setupPagination5(filteredProducts5);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Function to render products for the current page
// function renderProductsPage5(page, products) {
//   const start = (page - 1) * productsPerPage5;
//   const end = start + productsPerPage5;
//   const paginatedProducts = products.slice(start, end);
//   renderProducts5(paginatedProducts);
// }

// // Function to render products
// function renderProducts5(products) {
//   const productsHTML3 = products.map((item) => {
//     const name = item.name;
//     const pname = item.pname;
//     const number = item.pnumber;
//     const purpose = item.description;
//     const typeofproduct = item.typeofproduct;
//     const status = item.status;
//     const requestId = item._id;
//     const loanDate = new Date(item.loanDate);
//     const formattedLoanDate = loanDate.toISOString().split('T')[0];

//     return `
//       <tr>
//         <td>${name}</td>
//         <td>${pname}</td>
//         <td>${number}</td>
//         <td>${typeofproduct}</td>
//         <td>${purpose}</td>
//         <td>${formattedLoanDate}</td>
//         <td>${status}</td>
//       </tr>
//     `;
//   }).join('');

//   weeklyproductsapprovedcontainer.innerHTML = productsHTML3;
// }


// // Function to setup pagination// Function to setup pagination
// function setupPagination5(products) {
//   const totalPages = Math.ceil(totalProducts5 / productsPerPage5);

//   previousBtn5.addEventListener("click", () => {
//     if (currentPage5 > 1) {
//       currentPage5--;
//       renderProductsPage5(currentPage5, products);
//     }
//   });

//   nextBtn5.addEventListener("click", () => {
//     if (currentPage5 < totalPages) {
//       currentPage5++;
//       renderProductsPage5(currentPage5, products);
//     }
//   });
// }


// // Fetch and display products with pagination when the page loads
// fetchAndDisplayProducts5();









// async function fetchAndDisplayProducts6() {
//   try {
//     const response = await axios.get('/requests');
//     products6 = response.data;

//     // Filter out products based on loan date and status
//     const filteredProducts6 = products6.filter((item) => {
//       const now = new Date();
//       const loanDate = new Date(item.loanDate);
//       const diffInMs = now.getTime() - loanDate.getTime();
//       const diffInHours = diffInMs / (1000 * 60 * 60);
//       return diffInHours < 168  &&  item.status ==="returned"  ;
//     });
//     totalProducts6 = filteredProducts6.length;
//     if (totalProducts6 === 0) {
//       weeklyproductsreturnedcontainer.innerHTML = "<h1>No weekly returned transactions</h1>";
   
//       return;
//     }

//     renderProductsPage6(currentPage6, filteredProducts6);
//     setupPagination6(filteredProducts6);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Function to render products for the current page
// function renderProductsPage6(page, products) {
//   const start = (page - 1) * productsPerPage6;
//   const end = start + productsPerPage6;
//   const paginatedProducts = products.slice(start, end);
//   renderProducts6(paginatedProducts);
// }

// // Function to render products
// function renderProducts6(products) {
//   const productsHTML3 = products.map((item) => {
//     const name = item.name;
//     const pname = item.pname;
//     const number = item.pnumber;
//     const purpose = item.description;
//     const typeofproduct = item.typeofproduct;
//     const status = item.status;
//     const requestId = item._id;
//     const loanDate = new Date(item.loanDate);
//     const formattedLoanDate = loanDate.toISOString().split('T')[0];

//     return `
//       <tr>
//         <td>${name}</td>
//         <td>${pname}</td>
//         <td>${number}</td>
//         <td>${typeofproduct}</td>
//         <td>${purpose}</td>
//         <td>${formattedLoanDate}</td>
//         <td>${status}</td>
//       </tr>
//     `;
//   }).join('');

//   weeklyproductsreturnedcontainer.innerHTML = productsHTML3;
// }


// // Function to setup pagination// Function to setup pagination
// function setupPagination6(products) {
//   const totalPages = Math.ceil(totalProducts6 / productsPerPage6);

//   previousBtn6.addEventListener("click", () => {
//     if (currentPage6 > 1) {
//       currentPage6--;
//       renderProductsPage6(currentPage6, products);
//     }
//   });

//   nextBtn6.addEventListener("click", () => {
//     if (currentPage6 < totalPages) {
//       currentPage6++;
//       renderProductsPage6(currentPage6, products);
//     }
//   });
// }


// // Fetch and display products with pagination when the page loads
// fetchAndDisplayProducts6();



















  
//   function updateChart(xx1, xx2,xx3,xx4,xx5) {
//     const ctx = document.getElementById('myChart').getContext('2d');
//     const myChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['Requested', 'Taken', 'Declined','approved not taken','Returned'],
//         datasets: [{
//           label: 'Transaction Status',
//           data: [xx1, xx2, xx3,xx4,xx5], // Replace with your actual values
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(252, 206, 86, 0.2)',
//             'rgba(256, 206, 86, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(50, 162, 235, 1)',
//             'rgba(252, 206, 86, 1)'
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }
  
 





  
//   function displayingrequested() {

//     window.location ='#weeklyrequested'
    
//     // Check the current display style of the weekly element
//     if (weeklyrequestedElement.style.display === 'block') {
//       // If it's currently visible, hide it
//       weeklyrequestedElement.style.display = 'none';
//     } else {
//       // If it's currently hidden, show it
//       weeklyrequestedElement.style.display = 'block';
//     }
//     weeklyreturnedElement.style.display = 'none';
//     weeklyElement.style.display = 'none';
//     weeklyapprovedElement.style.display ='none';
//     weeklydeclinedElement.style.display ='none';
  
//    }

  


//  function  displayingsuccess(){

//   window.location ='#weekly'
//   // Check the current display style of the weekly element
//   if (weeklyElement.style.display === 'block') {
//     // If it's currently visible, hide it
//     weeklyElement.style.display = 'none';
//   } else {
//     // If it's currently hidden, show it
//     weeklyElement.style.display = 'block';
//   }

//   weeklyrequestedElement.style.display = 'none';
//   weeklyreturnedElement.style.display = 'none';
//   weeklyapprovedElement.style.display ='none';
//   weeklydeclinedElement.style.display ='none';
//  }


 
//  function   displayingdecline(){

//   window.location ='#weeklydeclined'
//   // Check the current display style of the weekly element
//   if (weeklydeclinedElement.style.display === 'block') {
//     // If it's currently visible, hide it
//     weeklydeclinedElement.style.display = 'none';
//   } else {
//     // If it's currently hidden, show it
//     weeklydeclinedElement.style.display = 'block';
//   }

//   weeklyrequestedElement.style.display = 'none';
//   weeklyElement.style.display = 'none';
//   weeklyapprovedElement.style.display ='none';
//   weeklyreturnedElement.style.display ='none';
//  }


 
//  function   displayingreturned(){

//   window.location ='#weeklyreturned'
//   // Check the current display style of the weekly element
//   if (weeklyreturnedElement.style.display === 'block') {
//     // If it's currently visible, hide it
//     weeklyreturnedElement.style.display = 'none';
//   } else {
//     // If it's currently hidden, show it
//     weeklyreturnedElement.style.display = 'block';
//   }

//   weeklyrequestedElement.style.display = 'none';
//   weeklyElement.style.display = 'none';
//   weeklyapprovedElement.style.display ='none';
//   weeklydeclinedElement.style.display ='none';
//  }


 
//  function   displayingapproved(){

//   window.location ='#weeklyapproved'
//   // Check the current display style of the weekly element
//   if (weeklyapprovedElement.style.display === 'block') {
//     // If it's currently visible, hide it
//     weeklyapprovedElement.style.display = 'none';
//   } else {
//     // If it's currently hidden, show it
//     weeklyapprovedElement.style.display = 'block';
//   }

//   weeklyrequestedElement.style.display = 'none';
//   weeklyElement.style.display = 'none';
//   weeklydeclinedElement.style.display ='none';
//   weeklyreturnedElement.style.display ='none';
//  }