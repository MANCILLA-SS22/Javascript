const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");


const socket = io({auth: {token: "Test"}});

socket.on("connect_error", function(error){
    displayMessage(error);
})

socket.on("connect", function(){
    displayMessage(`You connected with id: ${socket.id}`);
});

socket.on("send-message", function(message){
    displayMessage(message);
})

form.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return;
    displayMessage(message);
    socket.emit("send-message", message, room);
    messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    socket.emit("join-room", room, function(message){
        displayMessage(message)
    });
});

let count = 0;
setInterval(() => {
    // socket.emit("ping", ++count);
    socket.volatile.emit("ping", ++count);
}, 1000);
document.addEventListener("keydown", function(event){
    if(event.target.matches("input")) return;
    if(event.key === "c"){
        console.log("Connected");
        socket.connect();
    }
    if(event.key === "d"){
        console.log("Disconnected");
        socket.disconnect();
    }
})

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("message-container").append(div);
}