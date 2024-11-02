const formulario = document.getElementById("formulario");
const formularioSearch = document.getElementById("searchForm");

const tiposDocumento = [
  new TipoDocumento(1, "Documento Nacional de Identidad", "DNI"),
  new TipoDocumento(2, "Libreta de Enrolamiento", "LE"),
  new TipoDocumento(3, "Libreta Cívica", "LC"),
];

let carreras = [];// Definimos las carreras disponibles para inscribirse
let estudiantes = [];// Definimos los Estudiantes que se hallan registrados
let matriculas = [];

if (localStorage.getItem("carreras")) {
  const carrerasJSON = JSON.parse(localStorage.getItem("carreras"));
  carreras = carrerasJSON.map(
    (element) => new Carrera(element.id, element.nombre)
  );

  // Cargamos la lista de carreras disponibles en la UI con la lista creada anteriormente
  let carrerasList = document.getElementById("carreras");
  carreras.forEach((element) => {
    let item = document.createElement("option");
    item.value = element.id.toString();
    item.innerText = element.toString();
    carrerasList.append(item);
  });
}

if (localStorage.getItem("estudiantes")) {
  const estudiantesJSON = JSON.parse(localStorage.getItem("estudiantes"));
  estudiantes = estudiantesJSON.map(
    (element) =>
      new Estudiante(
        element.id,
        tiposDocumento.find((d) => d.id == element.tipoDocumento.id),
        element.documento,
        element.apellidos,
        element.nombres,
        element.correo
      )
  );

  // Cargamos la lista de estudiantes disponibles en la UI con la lista creada anteriormente
  let estudiantesList = document.getElementById("estudiantes");
  estudiantes.forEach((element) => {
    let item = document.createElement("option");
    item.value = element.id.toString();
    item.innerText = element.toString();
    estudiantesList.append(item);
  });
}

if (localStorage.getItem("matriculas")) {
  const matriculacionesJSON = JSON.parse(localStorage.getItem("matriculas"));
  matriculas = matriculacionesJSON.map(
    (element) =>
      new Matricula(
        element.id,
        carreras.find((c) => c.id == element.carrera.id),
        estudiantes.find((e) => e.id == element.estudiante.id)
      )
  );
  pintarTabla(matriculas);
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

  let resultado = crearMatricula();
  if (resultado) {
    showSuccessMessage(["Estudiante matriculado a la carrera!"]);
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

  let resultados = matriculas.filter((element) =>
    element.carrera.nombre.toUpperCase().includes(searchText.toUpperCase())
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
  pintarTabla(matriculas);
});

function buscarCarreraById(id) {
  return carreras.find((element) => element.id === id);
}

function buscarEstudianteById(id) {
  return estudiantes.find((element) => element.id === id);
}

function buscarCarrera(idCarrera) {
  return carreras.find((element) => element.id === idCarrera);
}

function existeMatricula(idCarrera, legajo) {
  return matriculas.some(
    (element) =>
      element.carrera.id === idCarrera && element.estudiante.id === legajo
  );
}

function renderEntityDetails(entity) {// Mostrar los detalles del Estudiante
  if (entity) {
    return `<form id="detailsForm">
    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">N° Inscripción:</label>
      <input type="text" class="form-control" value="${entity.id.toString()}" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Carrera:</label>
      <input type="text" class="form-control" value="${
        entity.carrera.nombre
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Estudiante:</label>
      <input type="text" class="form-control" value="${entity.estudiante.toString()}" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Correo Electrónico:</label>
      <input type="text" class="form-control" value="${
        entity.estudiante.correo
      }" disabled/>
    </div>

    <div class="mb-3">
      <label class="form-label labelFullWith font-weight-bold text-left">Fecha de Matriculación:</label>
      <input type="text" class="form-control" value="${entity.fecha.toLocaleString()}" disabled/>
    </div>
  </form>`;
  } else {
    return `<p>No se puede cargar el detalle debido a que no encontramos la matrícula solicitada.</p>`;
  }
}

function showDetails(id) {
  const entity = matriculas.find((e) => e.id === id);
  Swal.fire({
    title: "¡Detalle de la Matrícula!",
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
  // Pintar la lista de estudiantes matriculados en a UI
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
          });">${element.carrera.toString()}</a></td>
          <td>${element.estudiante.toString()}</td>
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

function crearMatricula() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const idEstudiante = document.getElementById("estudiantes").value;
  const idCarrera = document.getElementById("carreras").value;

  // Buscamos el estudiante seleccionado y evaluamos si existe o no
  let unEstudiante = buscarEstudianteById(parseInt(idEstudiante));
  if (!unEstudiante) {
    showErrorMessage(["No se encuentra el estudiante seleccionado"]);
    return false;
  }

  // Buscamos la carrera seleccionada y evaluamos si existe o no
  let unaCarrera = buscarCarreraById(parseInt(idCarrera));
  if (!unaCarrera) {
    // informar de error
    showErrorMessage(["No se encuentra la carrera seleccionada"]);
    return false;
  }

  // Evaluamos si existe el Estudiante matriculado en la carrera seleccionada
  const existe = existeMatricula(unaCarrera.id, unEstudiante.id);
  if (existe) {
    // informar de error
    showErrorMessage([
      "Estudiante " +
        unEstudiante.toString() +
        " ya se encuentra matriculado/a a la carrera " +
        unaCarrera.toString(),
    ]);
    return false;
  }

  // Creamos una Matricula
  const unaMatricula = new Matricula(
    generarLegajo(matriculas.map((element) => element.id)),
    unaCarrera,
    unEstudiante
  );

  // Añadimos la nueva matricula a la lista de matriculas existente
  matriculas.push(unaMatricula);
  localStorage.setItem("matriculas", JSON.stringify(matriculas));
  pintarTabla(matriculas);
  return true;
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  formulario.reset();
}

function validarFormulario() {
  let errores = [];
  const idEstudiante = document.getElementById("estudiantes").value;

  const idCarrera = document.getElementById("carreras").value;

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
    duration: 2000,
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
