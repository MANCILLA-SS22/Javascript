const socketClient = io();

socketClient.emit("message", "Mensaje desde el formulario");

socketClient.on("users_list", function(data){
    console.log(data);
    const div = document.querySelector(".usersList");
    div.innerHTML = `${data.map((user) => `${user.name} - ${user.age}`)}`;
});

const button = document.querySelector("#button");
button.addEventListener("click", function(e){
    e.preventDefault();

    const name = document.querySelector("#name");
    const age = document.querySelector("#age");

    const user = {
        name: name.value,
        age: age.value,
    };

    socketClient.emit("form_message", user);
});