 const detailcontainer = document.querySelector('.detailcontainer');
 const params = window.location.search
 const id = new URLSearchParams(params).get('id')

 console.log(id)
 const showTask = async () => {
   try {
     const response = await axios.get(`/product/${id}`);
     const task = response.data;

     if (task) {
      const name = item.pName;
      const number = item.pNumber;
      const description = item.description;

       detailcontainer.innerHTML = `
         <div class="items">
         
        
         <div  class='item'>
               
               <h1>${name}</h1>
               <h1>${number}</h1>
               <h1>${description}</h1>
               <a href='/index.html'>back home</a>
           </div>

          
         </div>
       `;
     } else {
       detailcontainer.innerHTML = 'Not found';
     }
   } catch (error) {
     detailcontainer.innerHTML = error.message;
   }
 };
 showTask();