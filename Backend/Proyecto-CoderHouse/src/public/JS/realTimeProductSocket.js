const socket = io();

let products = document.querySelector("#newProducts");
let productList = document.querySelector("#productList");

window.onload = function(){
    fetch('http://localhost:5500/api/realTimeProduct')
    .then(response => response.json())
    .then(data => function(){
        dataProcessing(data.payload, products)
    })
    .catch(error => console.error(error));
}

function dataProcessing(data, container) {
    let div = data.map(function(e){
        return `
            <div class="main">
                <ul class="cards">
                    <li class="cards_item">
                        <div class="card">
                            <div class="card_image">
                                <img src=${e.thumbnail} class="ss"/>
                            </div>
                            <div class="card_content">
                                <h1>${e.title}</h1>
                                <p class="card_text">${e.price}</p>
                                <p class="card_text">${e.code}</p>
                                <p class="card_text">${e.stock}</p>
                                <p class="card_text">${e.category}</p>
                                <p class="card_text">${e._id}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>            
        `;
    });
    container.innerHTML = div.join("");
}

socket.on("product_list", function(data){
    document.querySelector("#newProducts").innerHTML = "";
    dataProcessing(data, productList);
});

const form = document.getElementById('form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    const obj = {}; //Creamos un objeto ADICIONAL donde se guardara la informacion que esta dentro del formulario para despues poderla enviar.
    const data = new FormData(form);
    form.reset();

    data.forEach((value, key) => obj[key] = value);
    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function(result){
        socket.emit("product_form", result);
    })
    .catch(err => console.log(err));
});