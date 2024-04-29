let carrerasJSON = [];
let carreras = [];

function pintarTabla(collection = []) {
  // Pintar la tabla de carreras en la UI
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";
  collection.forEach((element) => {
    let record = document.createElement("tr");
    record.innerHTML = `<tr>
      <td scope="row">${element.id}</td>
      <td>${element.toString()}</td>
      <td>${element.catedras.length.toString()}</td>
    </tr>`;
    bodyTable.append(record);
  });
}

if (localStorage.getItem("carreras")) {
  carrerasJSON = JSON.parse(localStorage.getItem("carreras"));
  carreras = carrerasJSON.map((element) => new Carrera(element.id, element.nombre));
  pintarTabla(carreras);
}

function buscarCarrera(nombre) {
  return carreras.find(
    (element) => element.nombre.toUpperCase() === nombre.toUpperCase()
  );
}

const formulario = document.getElementById("formulario");

function crearCarrera() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const nombre = document.getElementById("nombre").value;

  // Buscamos o creamos a una Carrera
  let unaCarrera = buscarCarrera(nombre);
  if (!unaCarrera) {
    unaCarrera = new Carrera(
      generarLegajo(carreras.map((element) => element.id)),
      nombre
    );

    // Añadir la nueva carrera a la lista de carreras registradas
    carreras.push(unaCarrera);
    // Almacewnar en el local storage todas las carreras
    localStorage.setItem("carreras", JSON.stringify(carreras));
  } else {
    // informar de error
    showErrorMessage([
      "La carrera con el nombre (" +
        nombre.toUpperCase() +
        ") ya se encuentra registrada.",
    ]);
    return false;
  }

  console.log("--> Carreras", carreras);
  pintarTabla(carreras);
  return true;
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  document.getElementById("nombre").value = "";
}

function validarFormulario() {
  let errores = [];
  const nombre = document.getElementById("nombre").value;

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
    showSuccessMessage(["Carrera registrada correctamente!"]);
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

  let resultados = carreras.filter((element) =>
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
  hideMessage();
  pintarTabla(carreras);
});
