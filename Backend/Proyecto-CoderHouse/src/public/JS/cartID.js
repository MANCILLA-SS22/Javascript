const header = document.getElementById("header");
const cart = document.getElementById("product");

const url = window.location.href; 
const id = url.substring(url.lastIndexOf('/')+1);

window.onload = function(e){
    fetch(`http://localhost:5500/api/carts/${id}`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    console.log(data)
    header.innerHTML = `
        <h1>La informacion del carrito es la siguiente</h3>
        <div class="container">
            <button class="btn btn-dark" onclick="window.history.go(-1)">Go to Product</button>
            <button class="btn btn-dark">Add to card</button>
        </div>        
    `;

    let html = data.products.map(function(data){
        return `
            <div class="product-info container">
                <h2>${data.product.title}</h2>
                <p>price: ${data.product.price}</p>
                <p>id: ${data.product._id}</p>
                <p>quantity: ${data.quantity}</p>
            </div>
        `
    });

    cart.innerHTML = html.join("");
}