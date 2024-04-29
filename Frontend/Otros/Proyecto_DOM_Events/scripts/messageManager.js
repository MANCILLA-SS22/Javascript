/**
 *
 * @param {*} messages Colección de mensajes representados por cadenas de texto en un array
 * @param {*} type Tipo de estilo esperado para mostrar en pantalla: success | danger
 * @param {*} title Título que acompañará al mensaje en la pantalla para ofrecer contexto
 */
function showMessage(
  messages = [],
  type = "success",
  title = "Título no definido"
) {
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

/**
 * Ocultar mensajes
 */
function hideMessage() {
  let messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = "";
}

/**
 *
 * @param {*} messages Mostrar en pantalla mensajes con un estilo success
 */
function showSuccessMessage(messages = [], title = "Operación exitosa") {
  showMessage(messages, "success", title);
}

/**
 *
 * @param {*} messages Mostrar en pantalla mensajes con un estilo danger
 */
function showErrorMessage(messages = [], title = "Encontramos errores :(") {
  showMessage(messages, "danger", title);
}
