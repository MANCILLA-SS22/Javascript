const socket = io();

const button = document.querySelector("#button");

button.addEventListener("click", function(e){
    e.preventDefault();

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");
    const thumbnail = document.querySelector("#thumbnail");
    const code = document.querySelector("#code");
    const stock = document.querySelector("#stock");
    const status = document.querySelector("#status");

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: thumbnail.value,
        code: code.value,
        stock: stock.value,
        status: status.value
    };

    socket.emit("product_form", product);
});

socket.on("product_list", function(data){
    const div = document.querySelector("#newProducts");
    div.innerHTML = data.map(function(e){
            return `
                <h2>title${e.title}</h2>
                <p>description${e.description}</p>
                <p>price${e.price}</p>
                <p>thumbnail${e.thumbnail}</p>
                <p>code${e.code}</p>
                <p>stock${e.stock}</p>
                <p>status${e.status}</p>`
        }
    );
});