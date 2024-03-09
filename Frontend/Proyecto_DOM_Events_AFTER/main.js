//Glosario
// preventDefault(); Cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur Event
// setAttribute(); Sets or changes an attribute's value or sets a new value to an attribute. If the attribute does not exist, it is created first.

const formulario = document.getElementById("formulario");
const formularioSearch = document.getElementById("searchForm");
let carrerasList = document.getElementById("carreras");

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
  new Carrera(10,"Prof. Universitario en Computación"),
];

// Cargamos la lista de carreras disponibles en la UI con la lista creada anteriormente
carreras.forEach((facultad) => {
  let item = document.createElement("option");
  item.value = facultad.num.toString();
  item.innerText = facultad.nombre;
  carrerasList.append(item);
});

// Creamos un conjunto de catedras (materias) para una de las carreras para permitir inscripción a un final
const catedrasParaAnalista = [
  new Catedra(1, "Algoritmos y Estructuras de Datos I"),
  new Catedra(2, "Ingles Técnico I"),
  new Catedra(3, "Matemáticas I"),
  new Catedra(4, "Introducción a la Informática I"),
  new Catedra(5, "Computación I")
];

for (let i = 0; i < carreras.length; i++) {
  carreras[i].setCatedras(catedrasParaAnalista);
}

let estudiantes = []; // representa al conjunto de estudiantes (personas) que se encuentran en las Bases de Datos de la institución. También podemos denominarlos formalmente legajos.
let matriculas = []; // representa al conjunto de inscripciones a carreras por parte de estudiantes que se encuentran en las Bases de Datos de la institución.
console.log(matriculas);
//console.log(estudiantes);

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.setAttribute("class", "needs-validation"); 
  hideMessage();
  
/*   let errores = validarFormulario();
  if (errores.length > 0) {
    showErrorMessage(errores);
    event.target.classList.add("was-validated");
    return false;
  } */

  let resultado = inscribirEstudianteACarrera();
  if (resultado) {
    showSuccessMessage(["Estudiante matriculado a la carrera!"]);
    limpiarCampos();
  }
  return resultado;
});

formularioSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessage();
  const searchText = document.getElementById("searchText").value;
  let resultado = estudiantes.find((unEstudiante) => 
  unEstudiante.apellidos.toUpperCase().includes(searchText.toUpperCase()) || unEstudiante.nombres.toUpperCase().includes(searchText.toUpperCase())
  );
  
  if (!resultado) {
    showErrorMessage(["No encontré al estudiante que buscas"]);
  } else {
    showSuccessMessage(["Encontré al estudiante que buscas!"]);
  }
  return !!resultado;
});

function inscribirEstudianteACarrera() {
  // Recuperaremos de cada uno de los inputs, el valor que ingreso/seleccionó el usaurio
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const idCarrera = parseInt(document.getElementById("carreras").value);

  // Buscamos o creamos a un Estudiante
  let unEstudiante = buscarEstudiante(apellidos, nombres); // console.log(unEstudiante);
  if (!unEstudiante) {
    unEstudiante = new Estudiante(generarLegajo(estudiantes), apellidos, nombres); //console.log("El objeto de la estudiante perteneciente a Matricula es: ",unEstudiante);
    estudiantes.push(unEstudiante);
  }

  // Buscamos la carrera seleccionada y evaluamos si existe o no
  let unaCarrera = buscarCarrera(idCarrera, nombres, apellidos);  //console.log("El objeto de la carrera perteneciente a Matricula es: ",unaCarrera);
  if (!unaCarrera) {
    showErrorMessage(["Ingresar los datos restantes"]);
    return false;
  }

  // Evaluamos si existe el Estudiante matriculado en la carrera seleccionada
  const existe = existeMatricula(idCarrera, unEstudiante.num);
  if (existe) {
    showErrorMessage(["Estudiante " + unEstudiante.toString() + " ya se encuentra matriculado/a a la carrera " + unaCarrera.toString()]);
    return false;
  }

  let UnLegajo = generarLegajo(matriculas);
  const unaMatricula = new Matricula(UnLegajo, unaCarrera, unEstudiante);
  matriculas.push(unaMatricula);

  pintarTablaMatriculas();
  return true;
}

function buscarEstudiante(apellidos, nombres) {
  return estudiantes.find((unEstudiante) => unEstudiante.nombres.toUpperCase() === nombres.toUpperCase() && unEstudiante.apellidos.toUpperCase() === apellidos.toUpperCase());
}

function buscarCarrera(idCarrera) {
  return carreras.find((unaCarrera) => unaCarrera.num === idCarrera);
}

function existeMatricula(idCarrera, legajo) {
  return matriculas.some((unaMatricula) =>
    unaMatricula.carrera.num === idCarrera && unaMatricula.estudiante.num === legajo);
}

function generarLegajo(coleccion = []) {
  let numeroPseudoAleatorio = Math.round(Math.random() * 10001);
  while (coleccion.some((elemento) => elemento.num === numeroPseudoAleatorio)) {
    console.log("--> Ya existia el numero pseudo-aleatorio que generamos, ahora generaremos otro.");
    numeroPseudoAleatorio = Math.round(Math.random() * 10001);
  }
  return numeroPseudoAleatorio;
}

function pintarTablaMatriculas() {
  // Pintar la lista de estudiantes matriculados en a UI
  let bodyTable = document.getElementById("matriculasTableBody");
  bodyTable.innerHTML = "";
  matriculas.forEach((unaMatricula) => {
    let record = document.createElement("tr");
    record.innerHTML = 
      `<tr>
      <td scope="row">${unaMatricula.num}</td>
      <td>${unaMatricula.carrera.toString()}</td>
      <td>${unaMatricula.estudiante.toString()}</td>
      </tr>`;
    bodyTable.append(record);
  });
}

function limpiarCampos() {
  // Limpiar todos y cada uno de los inputs
  document.getElementById("apellidos").value = "";
  document.getElementById("nombres").value = "";
  document.getElementById("carreras").value = "";
}

function validarFormulario() {
  let errores = [];
  const apellidos = document.getElementById("apellidos").value;
  const nombres = document.getElementById("nombres").value;
  const idCarrera = document.getElementById("carreras").value;

  return errores;
}

function showMessage(messages = [], type = "success", title = "Operación exitosa") {
  let messagesContainer = document.getElementById("messages");
  let messageBody = document.createElement("div");
  messageBody.setAttribute("role", "alert");
  messageBody.setAttribute("class", `alert alert-${type}`);

  // Personalisamos el mensaje con título y una división con los mensajes
  let titleBody = document.createElement("h4");
  titleBody.setAttribute("class", "alert-heading");
  titleBody.innerText = title;
  messageBody.append(titleBody);

  let divider = document.createElement("hr");
  messageBody.append(divider);

  // Añadimos unos a uno cada uno de los mensajes
  messages.forEach((msjs) => {
    let messageItem = document.createElement("p");
    messageItem.setAttribute("class", "mb-0");
    messageItem.innerText = msjs;
    messageBody.append(messageItem);
  });

  messagesContainer.append(messageBody);
}

function hideMessage() {
  let messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";
}

function showSuccessMessage(messages = []) {
  showMessage(messages, "success");
}

function showErrorMessage(messages = []) {
  showMessage(messages, "danger", "Encontramos errores :(");
}
