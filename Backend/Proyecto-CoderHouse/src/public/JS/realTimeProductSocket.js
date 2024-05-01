const socket = io();

let products = document.querySelector("#newProducts");
let productList = document.querySelector("#productList");

window.onload = function(){
    fetch('http://localhost:5500/api/realTimeProduct')
    .then(response => response.json())
    .then(data => dataProcessing(data.payload, products))
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
                                <p class="card_text">Price: ${e.price}</p>
                                <p class="card_text">Code: ${e.code}</p>
                                <p class="card_text">Stock: ${e.stock}</p>
                                <p class="card_text">Category: ${e.category}</p>
                                <p class="card_text">ID: ${e._id}</p>
                                <button onclick="deleteProduct('${e._id}')">Eliminar producto</button>
                                <button onclick="seeProduct('${e._id}')">Ver producto</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>            
        `;
    });
    container.innerHTML = div.join("");
}

async function deleteProduct(id){
    Swal.fire({
        title: "Estas seguro",
        text: "SI acepta, no podras recuperar el archivo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed){
            fetch(`http://localhost:5500/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            Swal.fire({
                title: "Eliminado!",
                text: "El producto ha sido eliminado",
                icon: "success"
            });
        }
    });
}

async function seeProduct(){
    
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