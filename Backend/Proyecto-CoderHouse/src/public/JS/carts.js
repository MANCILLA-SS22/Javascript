const carts = document.getElementById("carts");

window.onload = function(e){
    fetch(`http://localhost:5500/api/carts`)
    .then(response => response.json())
    .then(data => dataProcess(data.payload))
    .catch(error => console.log(error));
}

function dataProcess(data){
    console.log(data[0])
    let render = data.map(function(val){
        return (`
            <div class="product-info container">
                <h3>Carito con Id ${data[0]._id}</h3>
                <div class="container">
                <button class="btn btn-dark"><a class="text-decoration-none text-light" href='/cart/${data[0]._id}'>Product details</a></button>
                </div>
            </div>
        `);
    });

    carts.innerHTML = render.join("");
}