const productos = document.getElementById("productos");
const header = document.getElementById("header");

// const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams)

window.onload = function(){
    // let page = 1;
    // let limit = 4;
    // let stock = 1;
    // let sortInput = "asc";
    // let modelInput = "Old";
    // let link =`http://localhost:5500/api/products?page=${page}&limit=${limit}&sort=${sortInput}&stock=${stock}&category=${modelInput}`;

    let link = `http://localhost:5500/api/products`;
    fetchData(link);
}

function fetchData(link){
    fetch(`${link}`) 
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
};

function procesarDatos(data){
    header.innerHTML = `
        <h1>¡Bienvenido/a ${data.user.first_name} ${data.user.last_name}!</h1> <h3>Eres: ${data.user.role}</h3>
        <button onclick="myFunc()" class="btn btn-dark"><a class="text-decoration-none text-light" href="/api/auth/logout"> Logout </a></button>
        <button class="btn btn-dark" onclick="fetchData('${data.prevLink}')">Previous Link</button>
        <button class="btn btn-dark" onclick="fetchData('${data.nextLink}')">Next Link</button>
        
        <form action="">
            <label for="sort">Sort (asc-desc)</label>
            <select name="sort" id="sort">
                <option value="asc">Ascendente</option>
                <option value="desc">Decendente</option>
            </select>
            <label for="model">Tipo de modelo</label>
            <select name="model" id="model">
                <option value="Old">Usado</option>
                <option value="New">Nuevo</option>
            </select>
            <button class="btn btn-dark" id="check">Filtrar</button>
        </form>
    `; 

    document.getElementById("check").addEventListener("click", function(event){
        event.preventDefault();
        let sortInput = document.getElementById("sort").value;
        let modelInput = document.getElementById("model").value;
        let page = 1;
        let limit = 4;
        let stock = 1;
        // let sortInput = "asc";
        // let modelInput = "Old";
        let linkFilter = `http://localhost:5500/api/products?page=${page}&limit=${limit}&sort=${sortInput}&stock=${stock}&category=${modelInput}`;
        fetchData(linkFilter);
    });

    const renderCard = render(data);
    productos.innerHTML = renderCard.join('');       
}

function render(data){
    let render = data.payload.map(function(val){
        return (`
            <div class="product-info container">
                <h2>${val.title}</h2>
                <p>description: ${val.description}</p>
                <p>price: $${val.price}</p>
                <p>Category: ${val.category}</p>
                <img src="${val.thumbnail}" alt="img"  width="200" height="150">
                <div class="container">
                    <button class="btn btn-dark"> <a class="text-decoration-none text-light" href='/product/${val._id}'>Product details</a> </button>
                    <button class="btn btn-dark">Add to card</button>
                </div>
            </div>
        `);
    }); 
    return render;
}

function myFunc(){
    alert("Has cerrado sesion")
};