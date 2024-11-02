const cardContainer = document.getElementById("cardContainer");
const cartContainer = document.getElementById("cartContainer");
const buttons = document.getElementsByClassName("addbtn");
const showCartBtn = document.getElementById("showCart");
const checkOut = document.getElementById("checkOut");

class Item {
  constructor(id, name, price, description, category, stock, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.stock = stock;
    this.img = img;
  }
}

const items = [];
items.push(new Item(1, "Cogonauts Flidas", 3500, "Grindr", "Accesories", 5, "./img/cogonauts-flidas-grindr.webp"));
items.push(new Item(2, "Substrate Eden", 2500, "Substrate - 25L", "Growing", 0, "./img/eden-substrate.jpg"));
items.push(new Item(3, "Sodium Lamp", 3755, "Lamp - 400w", "Lighting", 10, "./img/sodium-lamp-400w.jpg"));


localStorage.getItem("catalog") ? console.log("Ya esta cargado el catálogo en el storage") : localStorage.setItem("catalog", JSON.stringify(items)); // Guardar el Catalogo en el Storage
let catalog = JSON.parse(localStorage.getItem("catalog")); // Traigo catálogo del storage
LoadItems(catalog); // Cargo mis productos en la página
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Genero un array para el carrito

for (let btn of buttons) { // Agrego eventos a los botones "ADD TOO CART"
  btn.addEventListener("click", function(){
    addToCart(btn.id)
  });
}

showCartBtn.addEventListener("click", showCart);
checkOut.addEventListener("click", checkOutFunction);

function LoadItems(catalog){
  catalog.forEach((e) => {
    const { name: nombre, img: imagen, description, price, stock, id } = e;
    let card = document.createElement("div");
    card.setAttribute("class", "Item");
    card.innerHTML = `
            <img  alt=${nombre} src='${imagen}'/>
            <h4>${nombre}</h4>
            <p>${description}</p>
            <h3>$${price}</h3>
            <h3 class= ${stock ? "green" : "red"}> Stock:${stock || " No hay Stock"}</h3> 
            <button class='addbtn' id='${id}'><a class='whiteLink'>ADD TO CART</a></button>`;
    cardContainer.appendChild(card);
  });
};

function addToCart(id){
  const cartItem = catalog.find((i) => i.id == id);
  if (cartItem.stock > 0) {
    const toast = (name) => {
      Toastify({
        text: `${name} agregado con éxito 🍁`,
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    };
    let alreadyInCart = cart.some((item) => item.id == id);
    if (alreadyInCart) {                                             // chequeo si el item ya está en el carrito
      const itemIndex = cart.findIndex((e) => e.id === cartItem.id); // Obtengo el indice del item en el carrito
      const item4cart = cart[itemIndex];
      item4cart.quantity++;                                          // Modifico la cantidad y el total
      item4cart.total = item4cart.price * item4cart.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      toast(item4cart.name);
    } else {
      const item4cart = {...cartItem, stock: cartItem.stock - 1, quantity: 1, total: cartItem.price};
      cart.push(item4cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast(item4cart.name);
    }
  } else {
    Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: "error",
      title: "No hay stock del producto seleccionado",
    });
  }
};

function cartIsEmpty(){
  cartContainer.innerHTML = ``;
  let sign = document.createElement("h2");
  sign.innerHTML = `No items in the Cart`;
  cartContainer.appendChild(sign);
};

function itemsInCart(){
  cartContainer.innerHTML = ``;
  cart.forEach((e) => {
    const { name, quantity, total } = e;
    let cartItem = document.createElement("div");
    cartItem.innerHTML = `
            <h3>${name}</h3>
            <h4> Cantidad: ${quantity}</h4>
            <h4>$${total}</h4>
            `;
    cartContainer.appendChild(cartItem);
  });
};

function showCart(){
  cart.length ? itemsInCart() : cartIsEmpty();
}

function order(){
  let message = "";
  cart.forEach((e) => {
    const { quantity, name, total } = e;
    message += `<p>(x${quantity}) - ${name} - $${total}</p>`;
  });
  return message;
};

function total(){
  cart.reduce((acc, val) => acc + val.total, 0);
} 

function checkOutFunction(){
  if (cart.length) {
    const DateTime = luxon.DateTime;
    const fecha = DateTime.now().setLocale("es").toLocaleString();

    Swal.fire({
      icon: "success",
      title: "Exito!",
      html: `Su orden:\n${order()}Ha sido generada con éxito. \n`,
      footer: `Fecha: ${fecha} - Precio total de su orden: $${total()}`,
    });
    localStorage.setItem("cart", JSON.stringify([]));
    cart = JSON.parse(localStorage.getItem("cart"));
    showCart();
  } else {
    Swal.fire({
      icon: "error",
      title: "No hay items en el carrito",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
