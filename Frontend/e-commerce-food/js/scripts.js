const Clickbutton = document.querySelectorAll(".button");
const tbody = document.querySelector("tbody");
const alert1 = document.querySelector('.alert');
const alert2 = document.querySelector('.remove');
const inputElement = tbody.getElementsByClassName("input__element");

let carrito = [];

Clickbutton.forEach(function(evento){
  evento.addEventListener("click", addToCarritoItem);
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function addToCarritoItem(evento){
  const button = evento.target; console.log(button); //const button = document.querySelector(".btn");
  const item = button.closest(".card"); console.log(item);
  const itemTitle = item.querySelector(".card-title").textContent; //console.log(itemTitle);
  const itemPrice = item.querySelector(".precio").textContent; //console.log(itemPrice);
  const itemImg = item.querySelector(".card-img-top").src; //console.log(itemImg);

  const newItem = {title: itemTitle, precio: itemPrice, img: itemImg, cantidad: 1};

  addItemCarrito(newItem);
}

function addItemCarrito(newItem){
  
  setTimeout(mostrarMensaje, 1000);
  alert1.classList.remove('hide');

  for (let i = 0; i < carrito.length; i++){
    if (carrito[i].title === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = inputElement[i];
      CarritoTotal();
      inputValue.value ++;
      return null; //En caso de cumplir con la condicion, retorna null y no se ejecutan las lineas 30 y 31.
    }
  }

  carrito.push(newItem);
  renderCarrito();
}

function renderCarrito(){
  tbody.innerHTML = "";

  carrito.map(item => {
    const fila = document.createElement("tr"); //Creamos un elemento "tr" que represen
    fila.classList.add("ItemCarrito"); //Al elemento creado arriba, le creamos una clase con el nombre "itemCarrito", lo que nos quedaria como <tr class="itemCarrito"></tr>
    fila.innerHTML = achetemeele(item);
    tbody.append(fila);

    fila.querySelector(".delete").addEventListener("click", removeItemCarrito);
    fila.querySelector(".input__element").addEventListener("change", sumaCantidad);
  });
  CarritoTotal();
  addLocalStorage();
}

function removeItemCarrito(evento){
  const buttonDelete = evento.target;
  const fila = buttonDelete.closest(".ItemCarrito"); console.log(fila);
  const title = fila.querySelector(".title").textContent; console.log(title);
  
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i,1)
    }
    
  }

  setTimeout(removerMensaje, 1000);
  alert2.classList.remove('remove');

  fila.remove();
  CarritoTotal();
}

function sumaCantidad(evento){
  const sumaInput = evento.target;
  const fila = sumaInput.closest(".ItemCarrito");
  const title = fila.querySelector(".title").textContent;
  carrito.forEach((item) => {
    if (item.title.trim() === title) {
      sumaInput.value<1 ? (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal();
    }
  });
}

function CarritoTotal(){
  let total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + precio*item.cantidad;
  });

  itemCartTotal.innerHTML = `Total $${total}`;
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function achetemeele(item){
  const x = `
    <th scope = "row">1</th>
        <td class="table__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.title}</h6>
        </td>
        <td class="table__price">
            <p>${item.precio}</p>
        </td>
        <td class="table__cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input__element">
            <button class="delete btn btn-danger">X</button>
        </td>`;
        return x;
}

function mostrarMensaje(){
  alert1.classList.add('hide');
}

function removerMensaje() {
  alert2.classList.add('remove');
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if(storage){
    carrito = storage;
    renderCarrito();
  }
}
