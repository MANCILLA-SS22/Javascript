const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const numerito = document.querySelector("#numerito");

let productosEnCarrito, productosCarritoLS, productos = [];

fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    productos = data; //Almacenamos la informacion del JSON en el array de productos
    cargarProductos(data); //Cargamos los objetos en el HTML
})


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

productosCarritoLS = localStorage.getItem("productos-en-carrito");  //console.log(productosCarritoLS);
if (productosCarritoLS) {
    productosEnCarrito = JSON.parse(productosCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

botonesCategorias.forEach((valor_X) => {             //Realizamos un barrido en todos los botones seleccionados en el HTML, que son 4.

    valor_X.addEventListener("click", (evento) => {  //Al realizar un click en cada uno de los botones, agregamos un evento
        botonesCategorias.forEach((valor_Y) => {     //Con este forEach mandamos a llamar a todos los botones y les eliminamos todos los active, para posteriormente en la linea 34, agregarselo unicamente al boton que presionamos.
            valor_Y.classList.remove("active")       //Eliminamos el active en todos los botones para que aparezcan en morado todos.
        }); 
        evento.target.classList.add("active");       //Agregamos active al boton que precionamos, el cual permitira que cambie de morado a blanco.

        if(evento.target.id != "todos"){
            const productoCategoria = productos.find(unProducto => unProducto.categoria.num === evento.target.id); //Buscamos en el array con el metodo find, el elemento num dentro del objeto categoria, para despues, obtener el primer objeto que el metodo haya encontrado.
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(unProducto => unProducto.categoria.num === evento.target.id); //Filtramos en el array con el metodo filter, todos los elementos num dentro del objeto categoria, para despues obtener un nuevo arreglo con todos los que se hayan encontrado.
            cargarProductos(productosBoton);

        }else{
            tituloPrincipal.innerHTML = "Todos los productos";
            cargarProductos(productos);
        }
    });
});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function cargarProductos(productosElegidos){      //Funcion para cargar los objetos de "let productos" en el HTML directamente desde JS
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(evento => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${evento.imagen}" alt="${evento.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${evento.titulo}</h3>
                <p class="producto-precio">${evento.precio}</p>
                <button class="producto-agregar" id="${evento.num}">Agregar</button>
            </div>`;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
    //console.log(botonesAgregar);
}

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar"); //Este querySelector se debe crear forzosamente aqui porque el nombre de esa clase que se esta buscando se crea en este documento JS y NO en el HTML. Si la escribimos al inicio, entonces el queryselector no encontrara nada porque la clase .producto-agregar se creo en la funcion agregarProducto.
    botonesAgregar.forEach(function(evento) {
        return evento.addEventListener("click", agregarAlCarrito);
    })
}

function agregarAlCarrito(evento){
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const productoAgregado = productos.find(producto => producto.num === evento.target.id); //Retorna el primer objeto encontrado
    const res = productosEnCarrito.some(unProducto => unProducto.num === evento.target.id); //Retorna true o false dependiendo de si existe el elemento. Esto para que en el carrito en lugar de que aparezca dos veces un producto, solo aumente la cantidad.
    console.log(); console.log(evento.target.id);
    console.log(); console.log(evento.target);
    
    if (res) {
        const index = productosEnCarrito.findIndex(unProducto => unProducto.num === evento.target.id); //Retorna el indice (posicion) donde se encuentra lo que se esta buscando
        productosEnCarrito[index].cantidad++; //Cuando llega a verdadero es porque que ya hay un valor en "cantidad", lo que quiere decir que simplemente al seleccionar dos veces el mismo producto, se le añade 1.

    }else{
        productoAgregado.cantidad = 1; //Aqui obtenemos un false de la funcion some de arriba, lo que indica que al producto agregado (productoAgregado) se le añade un elemento "cantidad" con un valor inicial de 1. Esto es lo mismo como si en el array de objetos, tuvieramos un elemento como el de num o titulo. 
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acumulador, unProducto) => acumulador + unProducto.cantidad, 0); //Realizamos la suma de todos los elementos existentes en el array de productosEnCarrito iniciando en 0 y cada que hagamos un click en cualquier boton, se ira iterando desde 1 en adelante auqneu el producto sea repetido.
    numerito.innerHTML = nuevoNumerito;
}