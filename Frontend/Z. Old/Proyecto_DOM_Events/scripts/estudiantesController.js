// Definimos las carreras disponibles para inscribirse
const tiposDocumento = [
  new TipoDocumento(1, "Documento Nacional de Identidad", "DNI"),
  new TipoDocumento(2, "Libreta de Enrolamiento", "LE"),
  new TipoDocumento(3, "Libreta Cívica", "LC"),
];

function buscarTipoDocumentoById(id) {
  return tiposDocumento.find((element) => element.id === id);
}

// Cargamos la lista de tipos de documentos disponibles en la UI con la lista creada anteriormente
let tiposList = document.getElementById("tiposDocumento");
tiposDocumento.forEach((unaCarrera) => {
  let item = document.createElement("option");
  item.value = unaCarrera.id.toString();
  item.innerText = unaCarrera.toString();
  tiposList.append(item);
});

const estudiantes = [];

function buscarEstudiante(tipoDocumento, documento) {
  return estudiantes.find(
    (element) =>
      element.tipoDocumento.id === tipoDocumento.id &&
      element.documento.toUpperCase() === documento.toUpperCase()
  );
}

const formulario = document.getElementById("formulario");

function pintarTabla(collection = []) {
  // Pintar la tabla de catedras en la UI
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";
  collection.forEach((element) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
      <td scope="row">${element.id}</td>
      <td>${ "(" + element.tipoDocumento.abreviatura.toUpperCase() + ") " + element.documento}</td>
      <td>${element.toString()}</td>
      <td>${element.correo.toString()}</td>
    </tr>`;
    bodyTable.append(record);
  });
}

function crearCarrera() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const idTipoDocumento = document.getElementById("tiposDocumento").value;
  const documento = document.getElementById("documento").value;
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const correo = document.getElementById("correo").value;

  // Buscamos el tipo de documento seleccionad0 y evaluamos si existe o no
  let unTipoDocumento = buscarTipoDocumentoById(parseInt(idTipoDocumento));
  if (!unTipoDocumento) {
    // informar de error
    showErrorMessage(["No se encuentra el tipo de documento seleccionado"]);
    return false;
  }

  // Buscamos o creamos a un Estudiante
  let unEstudiante = buscarEstudiante(unTipoDocumento, documento);
  if (!unEstudiante) {
    // Crear al estudiante
    unEstudiante = new Estudiante(
      generarLegajo(estudiantes.map((element) => element.id)),
      unTipoDocumento,
      documento,
      apellidos,
      nombres,
      correo
    );

    // Añadir al nuevo estudiante a la lista de estudiantes registrados
    estudiantes.push(unEstudiante);
  } else {
    // informar de error
    showErrorMessage([
      "Estudiante con Tipo (" +
        unTipoDocumento.toString().toUpperCase() +
        ") y N° de Documento (" +
        documento +
        ") ya se encuentra registrado.",
    ]);
    return false;
  }

  console.log("--> Estudiantes", estudiantes);
  pintarTabla(estudiantes);
  return true;
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  formulario.reset();
}

function validarFormulario() {
  let errores = [];
  const idTipoDocumento = document.getElementById("tiposDocumento").value;

  const documento = document.getElementById("documento").value;

  const apellidos = document.getElementById("apellidos").value;

  const nombres = document.getElementById("nombres").value;

  const correo = document.getElementById("correo").value;


  return errores;
}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.setAttribute("class", "needs-validation");
  hideMessage();
  let errores = validarFormulario();
  if (errores.length > 0) {
    showErrorMessage(errores);
    event.target.classList.add("was-validated");
    return false;
  }

  let resultado = crearCarrera();
  if (resultado) {
    showSuccessMessage(["Estudiante registrado correctamente!"]);
    limpiarCampos();
  }
  return resultado;
});

formulario.addEventListener("reset", (event) => {
  formulario.reset();
  hideMessage();
});

const formularioSearch = document.getElementById("searchForm");
formularioSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessage();
  const searchText = document.getElementById("searchText").value;

  if (searchText.length < 1) {
    showErrorMessage([
      "Para poder hacer un filtrado de datos es necesario ingresar un criterio",
    ]);
    return false;
  }

  let resultados = estudiantes.filter((element) =>
    element.nombres.toUpperCase().includes(searchText.toUpperCase()) || element.apellidos.toUpperCase().includes(searchText.toUpperCase())
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
