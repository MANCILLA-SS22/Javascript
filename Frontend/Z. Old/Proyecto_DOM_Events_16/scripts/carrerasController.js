const formulario = document.getElementById("formulario");
const formularioSearch = document.getElementById("searchForm");

let carrerasJSON = [];
let carreras = [];

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
    showSuccessMessage(["Carrera registrada correctamente!"]);
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
  pintarTabla(carreras);
});

getEntitiesFromStorage();

function renderCatedrasDetails(catedras = []) {// Mostrar los detalles de la Carrera
  if (catedras.length) {
    let list = document.createElement("ul");
    list.classList.add("text-left");
    catedras.forEach((c) => {
      const element = document.createElement("li");
      element.classList.add("text-left");
      element.innerText = c.nombre;
      list.append(element);
    });
    return list;
  } else {
    return `<p class="text-left">¡No hay catedras asociadas!</p>`;
  }
}

function renderEntityDetails(entity) {
  if (entity) {
    const catedrasDetails = renderCatedrasDetails(entity.catedras);
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
      <label class="form-label labelFullWith font-weight-bold text-left">Catedras:</label>
      ${entity.catedras.length ? catedrasDetails.innerHTML : catedrasDetails}
    </div>

  </form>`;
  } else {
    return `<p>No se puede cargar el detalle debido a que no encontramos la carrera solicitada.</p>`;
  }
}

function showDetails(id) {
  const entity = carreras.find((e) => e.id === id);
  Swal.fire({
    title: "¡Detalle de la Carrera!",
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
  // Pintar la tabla de carreras en la UI
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
          <td> <a href="javascript:showDetails(${element.id});">${element.toString()}</a> </td>
          <td>${element.catedras.length.toString()}</td>
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

function getEntitiesFromStorage() {
  if (localStorage.getItem("carreras")) {
    carrerasJSON = JSON.parse(localStorage.getItem("carreras"));
    carreras = carrerasJSON.map( (element) => new Carrera(element.id, element.nombre) );

    // Recuperar relación con Catedras
    if (localStorage.getItem("catedras")) {
      const catedrasJSON = JSON.parse(localStorage.getItem("catedras"));
      const catedras = catedrasJSON.map((element) => new Catedra(element.id,element.nombre,carreras.find((c) => c.id == element.carrera.id))
      );
      carreras.forEach((evento) => {
        evento.setCatedras(catedras.filter((parametro) => parametro.carrera.id == evento.id));
      });
    }
    pintarTabla(carreras);
  }
}

function buscarCarrera(nombre) {
  return carreras.find((element) => element.nombre.toUpperCase() === nombre.toUpperCase());
}

function crearCarrera() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const nombre = document.getElementById("nombre").value;

  // Buscamos o creamos a una Carrera
  let unaCarrera = buscarCarrera(nombre);
  if (!unaCarrera) {
    unaCarrera = new Carrera(generarLegajo(carreras.map((element) => element.id)),nombre);

    // Añadir la nueva carrera a la lista de carreras registradas
    carreras.push(unaCarrera);
    carreras.forEach((c) => {
      c.catedras = [];
    });
    // Almacenar en el local storage todas las carreras
    localStorage.setItem("carreras", JSON.stringify(carreras));
    getEntitiesFromStorage();
  } else {
    // informar de error
    showErrorMessage([
      "La carrera con el nombre (" +
        nombre.toUpperCase() +
        ") ya se encuentra registrada.",
    ]);
    return false;
  }
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
