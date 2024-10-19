


const getProducts = async () => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    console.log(params)
    return data;
}



const displayproducts = async ()=>{


const data= await getProducts();

console.log(data)




const result = data.products.map( (product)=>{

    return `
    <div  class="product">
    <img src="${product.thumbnail}"/>
    <h3>${product.title}</h3>
    <span>${product.price}</span>
    
    
    </div>`;
    
    
   
   
 
 }).join('');
 
 document.querySelector(".products .row").innerHTML=result;
 

}

displayproducts();

getProducts();