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

function buscarCarreraById(id) {
  return carreras.find((element) => element.id === id);
}

// Cargamos la lista de carreras disponibles en la UI con la lista creada anteriormente
let carrerasList = document.getElementById("carreras");
carreras.forEach((unaCarrera) => {
  let item = document.createElement("option");
  item.value = unaCarrera.id.toString();
  item.innerText = unaCarrera.toString();
  carrerasList.append(item);
});

// Creamos un conjunto de catedras (materias) para una de las carreras para permitir inscripción a un final
const catedras = [];

function buscarCatedra(nombre, unaCarrera) {
  return catedras.find(
    (element) =>
      element.nombre.toUpperCase() === nombre.toUpperCase() &&
      element.carrera.id === unaCarrera.id
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
      <td>${element.toString()}</td>
      <td>${element.carrera.toString()}</td>
    </tr>`;
    bodyTable.append(record);
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

    unaCarrera.addCatedra(unaCatedra);

    // Añadir la nueva catedra a la lista de catedras registradas
    catedras.push(unaCatedra);
  } else {
    // informar de error
    showErrorMessage([
      "La catedra con el nombre (" +
        nombre.toUpperCase() +
        ") ya se encuentra registrada en la carrera seleccionada.",
    ]);
    return false;
  }

  console.log("--> Catedras", catedras);
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
    showSuccessMessage(["Catedra registrada correctamente!"]);
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
