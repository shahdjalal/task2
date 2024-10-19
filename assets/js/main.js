
// get the categories from the api
const getcatogary = async () => {


    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);

    console.log(data)

    return data;
}

// display the categories on the screen
const displaycatogaries = async () => {

    const loader = document.querySelector(".loader_container");

    loader.classList.add("active");

    try {
        const categories = await getcatogary();

        const result = categories.map((category) => {


            return `
        <div class="catogory">
        
         <h2>${category}</h2>
         <a href="catogoryDetail.html?category=${category}">Details</a>
        </div>`;



        }).join("");



        document.querySelector(".catogories .row").innerHTML = result;

    }
    catch (Oerror) {
        document.querySelector(".catogories .row").innerHTML = "<p>error loading catogories</p>"

    }
    finally {
        loader.classList.remove("active");

    }

}


// get the products from the api
const getproducts = async (page) => {

    const skip = ( page - 1 ) * 30;


    const { data } = await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);

    console.log(data)

    return data;
}

// display the products on the screen
const displayproducts = async (page = 1) => {

    const loader = document.querySelector(".loader_container");

    loader.classList.add("active");

    try {
        const data = await getproducts(page);

        const numberOfPages= Math.ceil(data.total  / 30) ;

        console.log (numberOfPages) ;
        console.log (page) ;

        const result = data.products.map((product) => {

            return `
   <div  class="product">
   <img src="${product.thumbnail}"/>
   <h3>${product.title}</h3>
   <span>${product.price}</span>
   
   
   </div>`;



  

        }).join('');

        document.querySelector(".products .row").innerHTML = result;

       let paginationLinks=``;
      if(page == 1 ){

        paginationLinks +=` <li class="page-item"> <button href="#"   class="page-link"> &laquo;</button></li>`;

      }else{


        paginationLinks +=` <li class="page-item"> <button   onclick=displayproducts('${page-1}')  class="page-link"> &laquo;</button></li>`;
       
       
       
      }






       for(let i=1 ; i<=numberOfPages ; i++){


        paginationLinks += `<li class="page-item  ${i == page? 'active':' '}"> <button onclick=displayproducts('${i}')     class="page-link">${i}</button></li>`;


       }

       if (page == numberOfPages){

        paginationLinks += ` <li class="page-item"> <button     disabled  class="page-link"> &raquo;</button></li>`;

       }else{
   
        paginationLinks += ` <li class="page-item"> <button     onclick=displayproducts('${parseInt(page) +1}')  class="page-link"> &raquo;</button></li>`;
       }
      

       console.log(paginationLinks)
       document.querySelector(".pagination").innerHTML = paginationLinks;

    }

    catch (Oerror) {
        document.querySelector(".catogories .row").innerHTML = "<p>error loading productss</p>"

    }
    finally {
        loader.classList.remove("active");

    }
}

// call the functions

displaycatogaries();
displayproducts();

window.onscroll = function(){
const nav = document.querySelector(".header");
const catogories = document.querySelector(".catogories");

// //catogories بعيد عن nav ببين كم 
console.log(catogories.offsetTop);

// //كم عامل سكرول
console.log(window.scrollY);

if(window.scrollY > catogories.offsetTop){
    console.log("hi");
    nav.classList.add("scrollNav");
}

else{
    nav.classList.remove("scrollNav");
}
}


