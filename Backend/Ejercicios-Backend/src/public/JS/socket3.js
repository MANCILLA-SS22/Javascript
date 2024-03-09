const socket = io();

let user;
const chatbox = document.querySelector("#chatbox");

Swal.fire({
    title: "Bienvenido",
    text: "Ingrese su nombre para continuar",
    input: "text",
    allowOutsideClick: false,
    inputValidator: function(value){
        return !value && "Necesitás identificarte";
    }
})
.then(function(event){
    user = event.value;
    socket.emit("inicio", user); //1. Enviamos el nombre capturado en el imput
    socket.on("connected", function(data){//4. Aqui le llega a todos los usuarios menos al ultimo, el nombre ingresado
        if (user !== undefined) {
            Swal.fire({
                text: `Nuevo usuario conectado: ${data}`,
                toast: true,
                position: "top-right",
            });
        }
    });
});

chatbox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        socket.emit("message", {//6. Escribimos el primer mensaje y se envia al servidor al presionar enter
            user,
            message: event.target.value,
        });
        chatbox.value = "";
    }
});

socket.on("messages", function(data){   //9. Renderizamos losa mensajes en el html
    const log = document.querySelector("#messages");
    let messages = "";
    data.forEach(function(message){
        return messages += `<strong>${message.user}</strong>: ${message.message} <br />`;
    });

    log.innerHTML = messages;
});