let carrerasList = document.getElementById("carreras");
const formularioSearch = document.getElementById("searchForm");
const formulario = document.getElementById("formulario");

const tipoCatedras = [
  new Catedra(1, "Programacion estructurada"),
  new Catedra(2, "Programacion OOP"),
  new Catedra(3, "Bases de datos"),
];

let carrerasJSON = [];
let carreras = [];
let catedras = []; // Creamos un conjunto de catedras (materias) para una de las carreras para permitir inscripción a un final

// Cargamos la lista de carreras disponibles en la UI con la lista creada anteriormente
tipoCatedras.forEach((unaCarrera) => {
  let item = document.createElement("option");
  item.value = unaCarrera.id.toString();
  item.innerText = unaCarrera.toString();
  carrerasList.append(item);
});

if (localStorage.getItem("carreras")) {
  carrerasJSON = JSON.parse(localStorage.getItem("carreras"));
  carreras = carrerasJSON.map(
    (element) => new Carrera(element.id, element.nombre)
  );
}

if (localStorage.getItem("catedras")) {
  const catedrasJSON = JSON.parse(localStorage.getItem("catedras"));
  catedras = catedrasJSON.map(
    (element) =>
      new Catedra(
        element.id,
        element.nombre,
        carreras.find((c) => c.id == element.carrera.id)
      )
  );
  pintarTabla(catedras);
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.setAttribute("class", "needs-validation");
  let errores = validarFormulario();
  if (errores.length > 0) {
    showErrorMessage(errores);
    event.target.classList.add("was-validated");
    return false;
  }

  let resultado = crearCarrera();
  if (resultado) {
    showSuccessMessage(["Catedra registrada correctamente!"]);
    limpiarCampos();
  }
  return resultado;
});

formulario.addEventListener("reset", (event) => {
  formulario.reset();
});

formularioSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchText = document.getElementById("searchText").value;

  if (searchText.length < 1) {
    showErrorMessage([
      "Para poder hacer un filtrado de datos es necesario ingresar un criterio",
    ]);
    return false;
  }

  let resultados = catedras.filter((element) =>
    element.nombre.toUpperCase().includes(searchText.toUpperCase())
  );
  if (resultados.length < 1) {
    showErrorMessage([
      "No encontramos registros que coincidan con la búsqueda",
    ]);
    return false;
  }

  pintarTabla(resultados);
  return true;
});

formularioSearch.addEventListener("reset", (event) => {
  pintarTabla(catedras);
});

function buscarCarreraById(id) {// Definimos las carreras disponibles para inscribirse
  return carreras.find((element) => element.id === id);
}

function buscarCatedra(nombre, unaCarrera) {
  return catedras.find(
    (element) =>
      element.nombre.toUpperCase() === nombre.toUpperCase() &&
      element.carrera.id === unaCarrera.id
  );
}

function renderEntityDetails(entity) {// Mostrar los detalles de la Catedra
  if (entity) {
    return `<form id="detailsForm">
    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Número:</label>
      <input type="text" class="form-control" value="${entity.id.toString()}" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Nombre:</label>
      <input type="text" class="form-control" value="${
        entity.nombre
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Carrera:</label>
      <input type="text" class="form-control" value="${
        entity.carrera.nombre
      }" disabled/>
    </div>

  </form>`;
  } else {
    return `<p>No se puede cargar el detalle debido a que no encontramos la catedra solicitada.</p>`;
  }
}

function showDetails(id) {
  const entity = catedras.find((e) => e.id === id);
  Swal.fire({
    title: "¡Detalle de la Catedra!",
    html: renderEntityDetails(entity),
    showCloseButton: true,
    showConfirmButton: false,
  });
}

function simularRecuperacionAsincrona(collection) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (collection.length) {
        resolve(collection);
      } else {
        reject("No hay datos para mostrar");
      }
    }, 3000);
  });
}

function pintarTabla(collection = []) {
  // Pintar la tabla de catedras en la UI
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";
  toggleLoadingContainer(true);
  simularRecuperacionAsincrona(collection)
    .then((elements) => {
      elements.forEach((element) => {
        let record = document.createElement("tr");
        record.innerHTML = `<tr>
          <td scope="row">${element.id}</td>
          <td><a href="javascript:showDetails(${
            element.id
          });">${element.toString()}</a></td>
          <td>${element.carrera.toString()}</td>
        </tr>`;
        bodyTable.append(record);
      });
    })
    .catch((error) => {
      let record = document.createElement("tr");
      record.innerHTML = `<tr>
      <td colspan="3" scope="row">${error}</td>
    </tr>`;
      bodyTable.append(record);
    })
    .finally(() => {
      toggleLoadingContainer(false);
    });
}

function crearCarrera() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const idCarrera = document.getElementById("carreras").value;
  const nombre = document.getElementById("nombre").value;

  // Buscamos la carrera seleccionada y evaluamos si existe o no
  let unaCarrera = buscarCarreraById(parseInt(idCarrera));
  if (!unaCarrera) {
    // informar de error
    showErrorMessage(["No se encuentra la carrera seleccionada"]);
    return false;
  }

  // Buscamos o creamos a una Catedra
  let unaCatedra = buscarCatedra(nombre, unaCarrera);
  if (!unaCatedra) {
    unaCatedra = new Catedra(
      generarLegajo(catedras.map((element) => element.id)),
      nombre,
      unaCarrera
    );

    //unaCarrera.addCatedra(unaCatedra);
    // Añadir la nueva catedra a la lista de catedras registradas
    catedras.push(unaCatedra);
    localStorage.setItem("catedras", JSON.stringify(catedras));
  } else {
    // informar de error
    showErrorMessage([
      "La catedra con el nombre (" +
        nombre.toUpperCase() +
        ") ya se encuentra registrada en la carrera seleccionada.",
    ]);
    return false;
  }

  pintarTabla(catedras);
  return true;
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("carreras").value = "";
}

function validarFormulario() {
  let errores = [];
  const apellidos = document.getElementById("carreras").value;

  const nombres = document.getElementById("nombre").value;

  return errores;
}


//messageManager
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

function showSuccessMessage(messages = [], title = "Operación exitosa") {
  showMessage(messages, "success", title);
}

function showErrorMessage(messages = [], title = "Encontramos errores :(") {
  showMessage(messages, "danger", title);
}

//util.js
function createPseudoaleatorio() {
  return Math.round(Math.random() * 10001);
}

function generarLegajo(coleccion = []) {
  let numeroPseudoAleatorio = createPseudoaleatorio();
  while (coleccion.some((elemento) => elemento === numeroPseudoAleatorio)) {
    numeroPseudoAleatorio = createPseudoaleatorio();
  }
  return numeroPseudoAleatorio;
}

function toggleLoadingContainer(isLoading = false) {
  const loadingContainer = document.getElementById("loadingMessage");
  if (isLoading) {
    loadingContainer.classList.remove("visually-hidden");
  } else {
    loadingContainer.classList.add("visually-hidden");
  }
}