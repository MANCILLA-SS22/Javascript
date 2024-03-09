// // Mismo codigo de menu.js pero sin usar productos.json
// const contenedorProductos = document.querySelector("#contenedor-productos");
// const botonesCategorias = document.querySelectorAll(".boton-categoria");
// const tituloPrincipal = document.querySelector("#titulo-principal");
// const numerito = document.querySelector("#numerito");
// //let botonesAgregar = document.querySelectorAll(".producto-agregar");

// let productos = [
//     {"num": "abrigo-01","titulo": "Abrigo 01","imagen": "./img/abrigos/01.jpg","categoria": {"nombre": "Abrigos","num": "abrigos"},"precio": 1000},
//     {"num": "abrigo-02","titulo": "Abrigo 02","imagen": "./img/abrigos/02.jpg","categoria": {"nombre": "Abrigos","num": "abrigos"},"precio": 1000},
//     {"num": "abrigo-03","titulo": "Abrigo 03","imagen": "./img/abrigos/03.jpg","categoria": {"nombre": "Abrigos","num": "abrigos"},"precio": 1000},
//     {"num": "abrigo-04","titulo": "Abrigo 04","imagen": "./img/abrigos/04.jpg","categoria": {"nombre": "Abrigos","num": "abrigos"},"precio": 1000},
//     {"num": "abrigo-05","titulo": "Abrigo 05","imagen": "./img/abrigos/05.jpg","categoria": {"nombre": "Abrigos","num": "abrigos"},"precio": 1000},
//     {"num": "camiseta-01","titulo": "Camiseta 01","imagen": "./img/camisetas/01.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-02","titulo": "Camiseta 02","imagen": "./img/camisetas/02.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-03","titulo": "Camiseta 03","imagen": "./img/camisetas/03.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-04","titulo": "Camiseta 04","imagen": "./img/camisetas/04.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-05","titulo": "Camiseta 05","imagen": "./img/camisetas/05.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-06","titulo": "Camiseta 06","imagen": "./img/camisetas/06.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-07","titulo": "Camiseta 07","imagen": "./img/camisetas/07.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "camiseta-08","titulo": "Camiseta 08","imagen": "./img/camisetas/08.jpg","categoria": {"nombre": "Camisetas","num": "camisetas"},"precio": 1000},
//     {"num": "pantalon-01","titulo": "Pantalón 01","imagen": "./img/pantalones/01.jpg","categoria": {"nombre": "Pantalones","num": "pantalones"},"precio": 1000},
//     {"num": "pantalon-02","titulo": "Pantalón 02","imagen": "./img/pantalones/02.jpg","categoria": {"nombre": "Pantalones","num": "pantalones"},"precio": 1000},
//     {"num": "pantalon-03","titulo": "Pantalón 03","imagen": "./img/pantalones/03.jpg","categoria": {"nombre": "Pantalones","num": "pantalones"},"precio": 1000},
//     {"num": "pantalon-04","titulo": "Pantalón 04","imagen": "./img/pantalones/04.jpg","categoria": {"nombre": "Pantalones","num": "pantalones"},"precio": 1000},
//     {"num": "pantalon-05","titulo": "Pantalón 05","imagen": "./img/pantalones/05.jpg","categoria": {"nombre": "Pantalones","num": "pantalones"},"precio": 1000}
// ];

// let productosEnCarrito;
// let productosEnCarritoLS;

// /* let productos = [];
// fetch("./js/productos.json")
//     .then(response => response.json())
//     .then(data => {
//         productos = data;
//         cargarProductos(productos);
//     }) */


// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
// if (productosEnCarritoLS) {
//     productosEnCarrito = JSON.parse(productosEnCarritoLS);
//     actualizarNumerito();
// }else{
//     productosEnCarrito = [];
// }

// cargarProductos(productos); //Cargamos los objetos en el HTML

// botonesCategorias.forEach((valor_X) => {           //Realizamos un barrido en todos los botones seleccionados en el HTML, que son 4.
//     valor_X.addEventListener("click", (evento) => {     //Al realizar un click en cada uno de los botones, agregamos un evento
//         botonesCategorias.forEach((valor_Y) => {   //Con este forEach mandamos a llamar a todos los botones y les eliminamos todos los active, para posteriormente en la linea 34, agregarselo unicamente al boton que presionamos.
//             valor_Y.classList.remove("active")     //Eliminamos el active en todos los botones para que aparezcan en morado todos.
//         }); 
//         evento.target.classList.add("active");         //Agregamos active al boton que precionamos, el cual permitira que cambie de morado a blanco.

//         if(evento.target.id != "todos"){
//             const productoCategoria = productos.find(unProducto => unProducto.categoria.num === evento.target.id); //Buscamos en el array con el metodo find, el elemento num dentro del objeto categoria, para despues, obtener el primer objeto que el metodo haya encontrado.
//             tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;

//             const productosBoton = productos.filter(unProducto => unProducto.categoria.num === evento.target.id); //Filtramos en el array con el metodo filter, todos los elementos num dentro del objeto categoria, para despues obtener un nuevo arreglo con todos los que se hayan encontrado.
//             cargarProductos(productosBoton);

//         }else{
//             tituloPrincipal.innerHTML = "Todos los productos";
//             cargarProductos(productos);
//         }
//     });
// });

// //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// function cargarProductos(productosElegidos){      //Funcion para cargar los objetos de "let productos" en el HTML directamente desde JS
//     contenedorProductos.innerHTML = "";
//     productosElegidos.forEach(evento => {
//         const div = document.createElement("div");
//         div.classList.add("producto");
//         div.innerHTML = `
//             <img class="producto-imagen" src="${evento.imagen}" alt="${evento.titulo}">
//             <div class="producto-detalles">
//                 <h3 class="producto-titulo">${evento.titulo}</h3>
//                 <p class="producto-precio">${evento.precio}</p>
//                 <button class="producto-agregar" id="${evento.num}">Agregar</button>
//             </div>
//         `;
//         contenedorProductos.append(div);
//     });
//     actualizarBotonesAgregar();
//     //console.log(botonesAgregar);
// }

// function actualizarBotonesAgregar(){
//     botonesAgregar = document.querySelectorAll(".producto-agregar"); //Este queriSelector se debe crear forzosamente aqui porque el nombre de esa clase que se esta buscando se crea en este documento JS y NO en el HTML. Si la escribimos al inicio, entonces el queryselector no encontrara nada porque la clase .producto-agregar se creo en la funcion agregarProducto.
//     botonesAgregar.forEach(evento => {
//         evento.addEventListener("click", agregarAlCarrito);
//     })
// }

// function agregarAlCarrito(evento){
//     Toastify({
//         text: "Producto agregado",
//         duration: 3000,
//         close: true,
//         gravity: "top", // `top` or `bottom`
//         position: "right", // `left`, `center` or `right`
//         stopOnFocus: true, // Prevents dismissing of toast on hover
//         style: {
//             background: "linear-gradient(to right, #4b33a8, #785ce9)",
//             borderRadius: "2rem",
//             textTransform: "uppercase",
//             fontSize: ".75rem"
//         },
//         offset: {
//             x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
//             y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
//         },
//         onClick: function(){} // Callback after click
//     }).showToast();

//     const productoAgregado = productos.find(producto => producto.num === evento.target.id); //Retorna el primer objeto encontrado
//     const res = productosEnCarrito.some(unProducto => unProducto.num === evento.target.id); //Retorna true o false dependiendo de si existe el elemento. Esto para que en el carrito en lugar de que aparezca dos veces un producto, solo aumente la cantidad.

//     if (res) {
//         const index = productosEnCarrito.findIndex(unProducto => unProducto.num === evento.target.id); //Retorna el indice (posicion) donde se encuentra lo que se esta buscando
//         productosEnCarrito[index].cantidad++; //Cuando llega a verdadero es porque que ya hay un valor en "cantidad", lo que quiere decir que simplemente al seleccionar dos veces el mismo producto, se le añade 1.

//     }else{
//         productoAgregado.cantidad = 1; //Aqui obtenemos un false de la funcion some de arriba, lo que indica que al producto agregado (productoAgregado) se le añade un elemento "cantidad" con un valor inicial de 1. Esto es lo mismo como si en el array de objetos, tuvieramos un elemento como el de num o titulo. 
//         productosEnCarrito.push(productoAgregado);
//     }
//     actualizarNumerito();
//     localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
// }

// function actualizarNumerito(){
//     let nuevoNumerito = productosEnCarrito.reduce((acumulador, unProducto) => acumulador + unProducto.cantidad, 0); //Realizamos la suma de todos los elementos existentes en el array de productosEnCarrito iniciando en 0 y cada que hagamos un click en cualquier boton, se ira iterando desde 1 en adelante auqneu el producto sea repetido.
//     numerito.innerHTML = nuevoNumerito;
// }