//Obtenemos las etiquetas del archivo index.HTML
const contenedor = document.getElementById("contenedor");
const carritoContenedor = document.getElementById("carritoContenedor");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const modalBody = document.querySelector(".modal .modal-body");
const precioTotal = document.getElementById("precioTotal");
const procesarCompra = document.getElementById("procesarCompra");

//Obtenemos las etiquetas del archivo compra.HTML
const listaCompra = document.querySelector("#lista-compra tbody");
const activarFuncion = document.getElementById("activarFuncion");
const totalProceso = document.getElementById("totalProceso");
const formulario = document.getElementById("procesar-pago");

//Creamos los objetos de cada videojuego, los cuales contienen nombre, precio, descripcion y cantidad
const stockProductos = [
  {
    num: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "Juego plataformero, niveles dificiles",
    precio: 1200,
    img: "img/Crash.jpg",
  },
  {
    num: 2,
    nombre: "Mortal Kombat X",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 1500,
    img: "img/mortal.jpg",
  },
  {
    num: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Juego plataformero, niveles basicos",
    precio: 1570,
    img: "img/pacman.jpg",
  },
  {
    num: 4,
    nombre: "Dragon Ball Xenoverse",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 1000,
    img: "img/dragonball.jpg",
  },
  {
    num: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 1275,
    img: "img/naruto.jpg",
  },
  {
    num: 6,
    nombre: "Shingeki Final Attack",
    cantidad: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    precio: 1200,
    img: "img/shingeki.jpg",
  },
  {
    num: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 1400,
    img: "img/league.jpg",
  },
  {
    num: 8,
    nombre: "Call Of Duty Warzone",
    cantidad: 1,
    desc: "Dispara como nunca",
    precio: 1200,
    img: "img/callduty.jpg",
  },
  {
    num: 9,
    nombre: "Fifa 2019",
    cantidad: 1,
    desc: "Juego de futbol",
    precio: 1400,
    img: "img/fifa.jpg",
  },
  {
    num: 10,
    nombre: "Fornite",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 1200,
    img: "img/fornite.jpg"
}];

//Creamos el arreglo en donde se almacenara la informacion
let carrito = [];  

//Desplegamos en el HTML todos y cada uno de los objetos creados en JS
stockProductos.forEach((evento) => {
  const {num, nombre, precio, desc, img, cantidad} = evento;
  if (contenedor) {
    contenedor.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${img}" mt-2  alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">Precio: ${precio}</p>
          <p class="card-text">Descripcion: ${desc}</p>
          <p class="card-text">Cantidad: ${cantidad}</p>
          <button onclick="agregarProducto(${num})" class="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>`
  }
});

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", vaciar)
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", alerta)
}

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

if (formulario) {
  formulario.addEventListener("submit", enviarPedido)
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("CarritoCompras")) || [];
  mostrarCarrito();
    document.getElementById("activarFuncion").click(procesarPedido);
})

function alerta(){
  if (carrito.length === 0) {
      Swal.fire({
        title: "Tu carrito esta vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar"
      })
    }else{
      location.href = "compra.html";
    }
}

function agregarProducto(num){
  const existe = carrito.some(evento => (evento.num === num) ); //Verificamos si existe algo en el carrito. De ser asi, el metodo some retorna un valor booleano.

  if (existe) {
    let unProducto;
    unProducto = carrito.map((evento) => {
      if (evento.num === num) {
        evento.cantidad++;
      }
    })
  } else{
    let item = stockProductos.find((evento) => evento.num === num); //Verificamos si existe algo en el carrito. De ser asi, el metodo find retorna el objeto donde se encuentra lo que estamos buscando.
    carrito.push(item);
  }
  
  mostrarCarrito();
}

function mostrarCarrito (){
  
  if (modalBody) {
    modalBody.innerHTML = "";
    if (carrito.length === 0) {
      modalBody.innerHTML = `
    <p class="text-center text-primary parrafo"> Aun no hay nada!</p>`
    }else{
      carrito.forEach((evento) => {
        const {num, nombre, precio, desc, img, cantidad} = evento;
        modalBody.innerHTML += `
        <div class="modal-contenedor">
            <div>  
                <img class="img-fluid img-carrito" src="${img}"/>
            </div> 
            <div>
                <p>Producto: ${nombre}</p>
                <p>Precio: ${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarProducto(${num})">Eliminar producto</button>
            </div>
        </div>`
      });
    }
  }

  if (carritoContenedor) {
    carritoContenedor.textContent = carrito.length;
  }

  if (precioTotal) {
    precioTotal.innerHTML = carrito.reduce((acumulador, unProducto) => (acumulador + (unProducto.cantidad*unProducto.precio)), 0);
  }
  guardarStorage();
}

function vaciar(){
  carrito.length = [];
  mostrarCarrito();
}

function eliminarProducto(num){
  const juegoNum = num;
  carrito = carrito.filter((evento) => evento.num !== juegoNum); //Filter va a seleccionar todos los objetos en los que su variable "num" tenga un valor distinto al valor que le enviamos desde la funcion.
  mostrarCarrito();
}

function procesarPedido(){
  carrito.forEach((evento) => {
    const {nombre, precio, img, cantidad} = evento;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
      <td>
        <img class="img-fluid img-carrito" src="${img}" />
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>${precio*cantidad}</td>
      `
      listaCompra.appendChild(row);
    }
  });
  
  if (totalProceso) {
    totalProceso.innerHTML = carrito.reduce((acumulador, unProducto) => (acumulador + (unProducto.cantidad*unProducto.precio)), 0);
  }
  
}

function enviarPedido(evento) {
  evento.preventDefault();
  const persona = document.querySelector("#persona").value;
  const correo = document.querySelector("#correo").value;

  if (correo === "" || persona === "") {
    Swal.fire({
        title: "Debes completar tu email y nombre!",
        text: "Rellenar el formulario",
        icon: "error",
        confirmButtonText: "Aceptar"
      })
  }else{

    const btn = document.getElementById('button');
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_qxwi0jn';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });

    const spinner = document.getElementById("spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");
    setTimeout(() => {
      spinner.classList.remove('d-flex')
      spinner.classList.add('d-none')
      formulario.reset()

      const alertExito = document.createElement('p')
      alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
      alertExito.textContent = 'Compra realizada correctamente'
      formulario.appendChild(alertExito)

      setTimeout(() => {
        alertExito.remove()
      }, 3000)

    }, 3000)
  }
}

function guardarStorage(){
  localStorage.setItem("CarritoCompras", JSON.stringify(carrito));
}




//NOTA: Cuando trabajamos con dos HTML o mas, al momento de trabajr con el DOM y mandamos a llamar a una funcion desde un HTML diferente al que se encuentra esta funcion, 
//entonces obtendremos un error puesto que JS buscara y jamas encontrara esa funcion porque no existe. Para ello, debemos usar el if y dentro de el ira la variable del DOM 
//como se muestra a continuacion:  if (modalBody).


//Esto es igual a la linea  
/* stockProductos.forEach((evento) => { Esta linea es lo mismo que lo de abajo pero de diferente sintaxis
  //const {id, nombre, precio, desc, img, cantidad} = evento;
  contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${evento.img}" mt-2  alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${evento.nombre}</h5>
        <p class="card-text">Precio: ${evento.precio}</p>
        <p class="card-text">Descripcion: ${evento.desc}</p>
        <p class="card-text">Cantidad: ${evento.cantidad}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`
}); */