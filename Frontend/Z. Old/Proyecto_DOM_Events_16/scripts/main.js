//         $$$$$$$$$$$$$$$ AJAX & FETCH $$$$$$$$$$$$$$$


/* // Ejemplo 1: fetch (método) sin aplicar los el then() y el catch(), y despues la plicación del método then() para ver que estructura posee una respuesta.
console.log( fetch('https://jsonplaceholder.typicode.com/posts') );

fetch('https://jsonplaceholder.typicode.com/posts')
.then((resp) =>
  console.log(resp)
); */

/* // Ejemplo 2: Obtener la información que se encuentra dentro del BODY de la RESPONSE, y recuperar un único objeto de la API
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((json) => {
    console.log(json)
  }); */

/* // Ejemplo 3: Cómo recuperar datos de una localizacion externa (http://) con rutas relativas
function recuperarPosteos() {
  let bodyTable = document.getElementById("tableBody"); // Pintar la tabla de carreras en la UI
  bodyTable.innerHTML = "";
  toggleLoadingContainer(true);
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((resultado) => resultado.json()) // Obtuvimos la respuesta --> Tomar los datos del body (.json())
    .then((data) => {                      // Obtenemos la colección de posteos
      data.forEach((post) => {
        let record = document.createElement("tr");
        record.innerHTML = 
        `<tr>
        <td scope="row">${post.id}</td>
        <td scope="row">${post.title}</td>
        <td scope="row">${post.body}</td>
        </tr>`;
        bodyTable.append(record);
      });
    })
    .catch((error) => {
      let record = document.createElement("tr");
      record.innerHTML = 
      `<tr>
          <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
        </tr>`;
      bodyTable.append(record);
    })
    .finally(() => {
      toggleLoadingContainer(false);
    });
}

recuperarPosteos(); */

// Ejemplo 4: Cómo recuperar datos de una localizacion interna (.json) con rutas relativas
function recuperarPosteos(){
  let bodyTable = document.getElementById("tableBody");// Pintar la tabla de carreras en la UI
  bodyTable.innerHTML = "";
  toggleLoadingContainer(true);
  fetch("./data/posts.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {// Obtenemos la colección de posteos
      let record = document.createElement("tr");
      record.innerHTML = `<tr>
      <td scope="row">${post.id}</td>
      <td scope="row">${post.title}</td>
      <td scope="row">${post.body}</td>
      </tr>`;
      bodyTable.append(record);
    });
  })
  .catch((error) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
        <td colspan="3" scope="row">Ocurrio un error al recuperar los datos</td>
      </tr>`;
    bodyTable.append(record);
  })
  .finally(() => {
    toggleLoadingContainer(false);
  });
}

recuperarPosteos();

/* // Ejemplo 5: Uso de ASYNC/AWAIT para crear funciones asincrónas que se comportan como si fueran sincronas
console.log("Previo a hacer la solicitud");
async function pedirPosts(){
  const respuesta = await fetch("./data/posts.json"); 

  console.log("Obtuvimos la respuesta: ");
  console.log(respuesta);

  const data = await respuesta.json();  
  console.log("Obtengo el BODY de la respuesta: ");
  console.log(data);
};

pedirPosts(); */

/* // Ejemplo 6: Uso de los parámetros de configuración para el método fetch (CREACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "POST",
  body: JSON.stringify({
    title: "Nuestro posteo personal",
    body: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

fetch("https://jsonplaceholder.typicode.com/posts", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 7: Uso de los parámetros de configuración para el método fetch (MODIFICACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "PUT",// PUT/GETCH
  body: JSON.stringify({
    title: "Le cambio el título",
    body: "Un nuevo contenido para el body de este post",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */

/* // Ejemplo 8: Uso de los parámetros de configuración para el método fetch (ELIMINACIÓN DE UN RECURSO)
const CONFIGURACION = {
  method: "DELETE",
};
//fetch("https://jsonplaceholder.typicode.com/posts/{id}", CONFIGURACION)
fetch("https://jsonplaceholder.typicode.com/posts/10", CONFIGURACION)
  .then((response) => response.json())
  .then((data) => console.log(data)); */



function showMessage(messages = [], type = "success",title = "Título no definido") {
  let messageBody = document.createElement("div");

  // Agregaremos un Título
  let messageTitle = document.createElement("h6");
  messageTitle.innerText = title;
  messageBody.append(messageTitle);

  // Agregaremos un divisor entre el título y los mensajes
  let messageDivider = document.createElement("hr");
  messageBody.append(messageDivider);

  // Añadimos unos a uno los mensajes
  messages.forEach((msjs) => {
    let messageItem = document.createElement("p");
    messageItem.setAttribute("class", "mb-0");
    messageItem.innerText = msjs;
    messageBody.append(messageItem);
  });

  // Construcción de la Notificación
  Toastify({
    node: messageBody,
    duration: 5000,
    className: `toast-${type}`,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
  }).showToast();
}

function createPseudoaleatorio() {
  return Math.round(Math.random() * 10001);
}

function toggleLoadingContainer(isLoading = false) {
  const loadingContainer = document.getElementById("loadingMessage");
  if (isLoading) {
    loadingContainer.classList.remove("visually-hidden");
  } else {
    loadingContainer.classList.add("visually-hidden");
  }
}