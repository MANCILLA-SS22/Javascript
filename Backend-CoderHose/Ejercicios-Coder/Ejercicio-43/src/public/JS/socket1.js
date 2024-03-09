const socketClient = io();

socketClient.emit("message", "Mensaje desde el cliente"); //Ahora, el servidor ya está escuchando por un evento con ID “message”, pero no hemos enseñado a nuestro cliente a comunicarse con el servidor. Para enviar un mensaje desde el cliente hacia el servidor (o desde el servidor al cliente, recuerda que es bidireccional), utilizamos la palabra emit, el cual debe contar con el ID (que en este caso es "message" y es el mismo que esta del lado del servidor) del mensaje a enviar, seguido del contenido de dicho mensaje. Los IDs deben coincidir para que el mensaje llegue correctamente

socketClient.on("server_message", function(data){
    console.log(data);
});

socketClient.on("message_all", function(data){
    console.log(data);
});

socketClient.on("message_all_1", function(data){
    console.log(data);
});

socketClient.on("message_all_2", function(data){
    console.log(data);
});