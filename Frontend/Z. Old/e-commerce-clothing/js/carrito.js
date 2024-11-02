const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

cargarProductosCarrito();

botonVaciar.addEventListener("click", vaciarCarrito);
botonComprar.addEventListener("click", comprarCarrito);

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) { //Verificamos si hay informacion en el almacenamiento local (ver linea 9)
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";
        productosEnCarrito.forEach((evento) => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = 
            `
                <img class="carrito-producto-imagen" src="${evento.imagen}" alt="${evento.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${evento.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${evento.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${evento.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${evento.precio * evento.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${evento.num}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        });

    }else{ //Si el carrito esta vacio, entonces se hace lo siguiente 
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); //Este queriSelector se debe crear forzosamente aqui porque el nombre de esa clase que se esta buscando se crea en este documento JS y NO en el HTML. Si la escribimos al inicio, entonces el queryselector no encontrara nada porque la clase .carrito-producto-eliminar se creo en la funcion cargarProductosCarrito.
    botonesEliminar.forEach(evento => {
        evento.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(evento){
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background: "linear-gradient(to right, #4b33a8, #785ce9)", borderRadius: "2rem", textTransform: "uppercase", fontSize: ".75rem"},
        offset: {x: '1.5rem',y: '1.5rem'},
        onClick: function(){} // Callback after click
    }).showToast();

    //const productoEliminado = productosEnCarrito.find((unProducto) => unProducto.num === evento.target.id);
    const index = productosEnCarrito.findIndex((unProducto => unProducto.num === evento.target.id));
    console.log(index);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function vaciarCarrito(){
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acumulador, unProducto) => acumulador + (unProducto.precio*unProducto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}