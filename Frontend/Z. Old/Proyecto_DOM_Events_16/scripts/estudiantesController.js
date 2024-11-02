let tiposList = document.getElementById("tiposDocumento");
const formulario = document.getElementById("formulario");
const formularioSearch = document.getElementById("searchForm");

// Definimos las carreras disponibles para inscribirse
const tiposDocumento = [
  new TipoDocumento(1, "Documento Nacional de Identidad", "DNI"),
  new TipoDocumento(2, "Libreta de Enrolamiento", "LE"),
  new TipoDocumento(3, "Libreta Cívica", "LC"),
];

let estudiantes = [];

tiposDocumento.forEach((unaCarrera) => {// Cargamos la lista de tipos de documentos disponibles en la UI con la lista creada anteriormente
  let item = document.createElement("option");
  item.value = unaCarrera.id.toString();
  item.innerText = unaCarrera.toString();
  tiposList.append(item);
});


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


if (localStorage.getItem("estudiantes")) {
  const estudiantesJSON = JSON.parse(localStorage.getItem("estudiantes"));
  estudiantes = estudiantesJSON.map((element) => 
  new Estudiante(element.id,tiposDocumento.find((d) => d.id == element.tipoDocumento.id),element.documento,element.apellidos,element.nombres,element.correo));
  pintarTabla(estudiantes);
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.setAttribute("class", "needs-validation");
  
/*   let errores = validarFormulario();
  console.log(errores)
  if (errores.length > 0) {
    showErrorMessage(errores);
    event.target.classList.add("was-validated");
    return false;
  } */

  let resultado = crearEstudiante();
  if (resultado) {
    showSuccessMessage(["Estudiante registrado correctamente!"]);
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
    showErrorMessage(["Para poder hacer un filtrado de datos es necesario ingresar un criterio"]);
    return false;
  }

  let resultados = estudiantes.filter(
    (element) =>
      element.nombres.toUpperCase().includes(searchText.toUpperCase()) ||
      element.apellidos.toUpperCase().includes(searchText.toUpperCase())
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
  pintarTabla(estudiantes);
});


function buscarTipoDocumentoById(id) {
  return tiposDocumento.find((element) => element.id === id);
}

function buscarEstudiante(tipoDocumento, documento) {
  return estudiantes.find((element) => element.tipoDocumento.id === tipoDocumento.id &&element.documento.toUpperCase() === documento.toUpperCase());
}

function renderEntityDetails(entity) {// Mostrar los detalles del Estudiante
  if (entity) {
    return `<form id="detailsForm">
    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Legajo:</label>
      <input type="text" class="form-control" value="${entity.id.toString()}" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Tipo de Documento:</label>
      <input type="text" class="form-control" value="${
        entity.tipoDocumento.nombre
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Número de Documento:</label>
      <input type="text" class="form-control" value="${
        entity.documento
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Apellidos:</label>
      <input type="text" class="form-control" value="${
        entity.apellidos
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Nombres:</label>
      <input type="text" class="form-control" value="${
        entity.nombres
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Correo Electrónico:</label>
      <input type="text" class="form-control" value="${
        entity.correo
      }" disabled/>
    </div>
  </form>`;
  } else {
    return `<p>No se puede cargar el detalle debido a que no encontramos al estudiante solicitado.</p>`;
  }
}

function showDetails(id) {
  const entity = estudiantes.find((e) => e.id === id);
  Swal.fire({
    title: "¡Detalle del Estudiante!",
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
        record.innerHTML = `
        <tr>
          <td scope="row">${element.id}</td>
          <td>${"(" + element.tipoDocumento.abreviatura.toUpperCase() + ") " + element.documento}</td>
          <td><a href="javascript:showDetails(${element.id});">${element.toString()}</a></td>
          <td>${element.correo.toString()}</td>
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

function crearEstudiante() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const idTipoDocumento = document.getElementById("tiposDocumento").value;
  const documento = document.getElementById("documento").value;
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;

  // Buscamos el tipo de documento seleccionado y evaluamos si existe o no
  let unTipoDocumento = buscarTipoDocumentoById(parseInt(idTipoDocumento));
  if (!unTipoDocumento) {
    showErrorMessage(["No se encuentra el tipo de documento seleccionado"]);
    return false;
  }

  // Buscamos o creamos a un Estudiante
  let unEstudiante = buscarEstudiante(unTipoDocumento, documento);
  if (!unEstudiante) {
    unEstudiante = new Estudiante(generarLegajo(estudiantes.map((element) => element.id)),unTipoDocumento,documento,apellidos,nombres,correo);
    estudiantes.push(unEstudiante);
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  } else {
    showErrorMessage(["Estudiante con Tipo (" + unTipoDocumento.toString().toUpperCase() + ") y N° de Documento (" + documento + ") ya se encuentra registrado.", ]);
    return false;
  }

  pintarTabla(estudiantes);
  return true;
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  formulario.reset();
}

/* function validarFormulario() {
  let errores = [];
  const idTipoDocumento = document.getElementById("tiposDocumento").value;
  const documento = document.getElementById("documento").value;
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;
  return errores;
} */


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