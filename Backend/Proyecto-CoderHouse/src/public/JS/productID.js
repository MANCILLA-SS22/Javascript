const header = document.getElementById("header");
const product = document.getElementById("product");

const url = window.location.href; 
const id = url.substring(url.lastIndexOf('/')+1);

window.onload = function(e){
    fetch(`http://localhost:5500/api/products/${id}`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    console.log(data)
    header.innerHTML = `<h1>Informacion del producto es la siguiente</h3>`;

    product.innerHTML = (`
        <div class="product-info container">
            <h2>${data.title}</h2>
            <img src="${data.thumbnail[0]}" alt="img"  width="400" height="350">
            <p>description: ${data.description}</p>
            <p>category: ${data.category}</p>
            <p>code: ${data.code}</p>
            <p>status: ${data.status}</p>
            <p>stock: ${data.stock}</p>
            <p>_id: ${data._id}</p>
            <p>price: $${data.price}</p>
            <div class="container">
                <button class="btn btn-dark" onclick="window.history.go(-1)">Go to Product</button>
                <button class="btn btn-dark">Add to card</button>
            </div>
        </div>
    `);
}