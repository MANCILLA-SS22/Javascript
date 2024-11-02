// Definimos las carreras disponibles para inscribirse
const carreras = [
  new Carrera(1, "Analista en Sistemas de Computación"),
  new Carrera(2, "Tec. Universitaria en celulosa y Papel"),
  new Carrera(3, "Tec. Universitaria en Tecnologías de la Información"),
  new Carrera(4, "Bioquímica"),
  new Carrera(5, "Farmacia"),
  new Carrera(6, "Ing. en Alimentos"),
  new Carrera(7, "Ing. Química"),
  new Carrera(8, "Lic. en Análisis Químicos y Bromatológicos"),
  new Carrera(9, "Lic. en Sistemas de Información"),
  new Carrera(10, "Prof. Universitario en Computación"),
];

// Cargamos la lista de carreras disponibles en la UI con la lista creada anteriormente
let carrerasList = document.getElementById("carreras");
carreras.forEach((element) => {
  let item = document.createElement("option");
  item.value = element.id.toString();
  item.innerText = element.toString();
  carrerasList.append(item);
});

// Definimos los Estudiantes que se hallan registrados
const unTipo = new TipoDocumento(1, "Documento Nacional de Identidad", "DNI");
const estudiantes = [
  new Estudiante(
    100,
    unTipo,
    "11222333",
    "Gonzalez",
    "Veronica",
    "veronica@gmail.com"
  ),
  new Estudiante(
    200,
    unTipo,
    "22333444",
    "Iparraguirre",
    "Juan",
    "juan@gmail.com"
  ),
  new Estudiante(
    300,
    unTipo,
    "33444555",
    "Mendez",
    "Silmara",
    "silmara@gmail.com"
  ),
  new Estudiante(
    400,
    unTipo,
    "44555666",
    "Casimiró",
    "Brian",
    "brian@gmail.com"
  ),
];

// Cargamos la lista de estudiantes disponibles en la UI con la lista creada anteriormente
let estudiantesList = document.getElementById("estudiantes");
estudiantes.forEach((element) => {
  let item = document.createElement("option");
  item.value = element.id.toString();
  item.innerText = element.toString();
  estudiantesList.append(item);
});

let matriculas = [];

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

const formulario = document.getElementById("formulario");

function pintarTabla(collection = []) {
  // Pintar la lista de estudiantes matriculados en a UI
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";
  collection.forEach((element) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
      <td scope="row">${element.id}</td>
      <td>${element.carrera.toString()}</td>
      <td>${element.estudiante.toString()}</td>
    </tr>`;
    bodyTable.append(record);
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

  unEstudiante.addMatricula(unaMatricula);
  unaCarrera.addMatricula(unaMatricula);

  // Añadimos la nueva matricula a la lista de matriculas existente
  matriculas.push(unaMatricula);
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

  let resultado = crearMatricula();
  if (resultado) {
    showSuccessMessage(["Estudiante matriculado a la carrera!"]);
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
