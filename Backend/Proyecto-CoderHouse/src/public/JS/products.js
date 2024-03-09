const productos = document.getElementById("productos");
const header = document.getElementById("header");

let page = 1;
let limit = 4;
let sort = "asc";
let stock = 1;
let category = "Old";
let link = `http://localhost:5500/api/products?page=${page}&limit=${limit}&sort=${sort}&stock=${stock}&category=${category}`

// const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams)

window.onload = function(){
    fetch(`${link}`) 
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function myFunc(){
    alert("Has cerrado sesion")
}

function res(data){
    fetch(`${data}`) 
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    header.innerHTML = `
        <h1>¡Bienvenido/a ${data.user.name}!</h1> <h3>Eres: ${data.user.role}</h3>
        <button class="btn btn-dark" onclick="res('${data.prevLink}')">Previous Link</button>
        <button class="btn btn-dark" onclick="res('${data.nextLink}')">Next Link</button>
        <button onclick="myFunc()" class="btn btn-dark"><a class="text-decoration-none text-light" href="/api/auth/logout"> Logout </a></button>
    `;
    
    let render = data.payload.map(function(val){
        return (`
            <div class="product-info container">
                <h2>${val.title}</h2>
                <p>description: ${val.description}</p>
                <p>price: $${val.price}</p>
                <img src="${val.thumbnail[0]}" alt="img"  width="200" height="150">
                <div class="container">
                    <button class="btn btn-dark">
                        <a class="text-decoration-none text-light" href='/product/${val._id}'>Product details</a>
                    </button>
                    <button class="btn btn-dark">Add to card</button>
                </div>
            </div>
        `);
    }); 
    productos.innerHTML = render.join('');
}