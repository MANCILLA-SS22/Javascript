import { ManagerPost } from "../utils/ManagerPost.js";
const manager = new ManagerPost("./data/post.json");

function socket1(io){
    const users = [];
    io.on('connection', function(socketClient){ //El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
        console.log("Nuevo cliente conectado");

        socketClient.on("message", function(data){ //Esta vez, una vez que el socket se ha conectado, podemos escuchar eventos de dicho socket, a partir de la sintaxis indicada: socket.on(“nombre_del_evento_a_escuchar”,callback con la data que me hayan enviado); Este “evento a escuchar” tiene un identificador que el cliente tiene que colocar de su lado para poder enviar información. Podemos tener múltiples socket.on, para tener así escuchar diferentes eventos.
            console.log(data);
            socketClient.emit("send_message", data);
        });

        socketClient.emit("server_message", "Mensaje desde el servidor"); //el carácter de un websocket debe ser bidireccional, eso significa que el servidor también debe poder enviar mensajes al cliente. 
        socketClient.emit("message_all",  "Mensaje para todos"); //Mensaje para todos incluyendo el sender

        socketClient.broadcast.emit("message_all_1", "Mensaje a todos los sockets, sin incluir al sender"); //broadcast va a enviar algo a todos los que esten conectados, menos al ultimo que se conecta o al sender
        // socketClient.broadcast.emit("message_all_2",  `${socketClient.id} Conectado`); //Esto se puede ver mejor si lo probamos entrando a localhost desde otro navegador 

        socketClient.on("form_message", function(data){
            console.log(data);
            users.push(data);
            socketClient.emit("users_list", users);
        });

        socketClient.emit("users_list", users);
    });    
}

function socket2(io){
    io.on("connection", function(socket){
        console.log("Nuevo cliente conectado");
    
        socket.on("post_send", async function(data){
            try {
                await manager.savePost(data);
                socket.emit("posts", manager.getPosts());
            } catch (error) {
                console.log(error);
            }
        });
        socket.emit("posts", manager.getPosts());
    });
}

function socket3(io){
const messages = [];
    io.on('connection', function(socket){//El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
        socket.on("inicio", function(data){ //2. Recivimos el nombre
            socket.broadcast.emit("connected", data); //3. Lo enviamos a todos los usuarios menos al ultimo
        })

        socket.on("message", function(data){//7. Recivimos el mensaje que se capturo en el imput
            messages.push(data);
            io.emit("messages", messages); //8. lo enviamos a todo los demas. (Esto es para indicar que se envia a todos y no solo a uno o a todos menos el ultimo, como con broadcast)
        });

        socket.emit("messages", messages);//Al cargar la pagina, se envia un array vacio. Cuando un usuario nuevo entre o cuando uno actualice el navegador, podra ver el array de mensajes. De lo contrario, aparecera en blanco.
    });
}

function socket4(io){
    const userIo = io.of("/");
    userIo.on("send-message", function(socket){
        console.log("Connected to user namespace"+ socket.username);
    });
    
    userIo.use(function(socket, next){
        if(socket.handshake.auth.token){
            socket.username = getUsernameFromToken(socket.handshake.auth.token);
            next();
        }else{
            next(new Error("Please send token"));
        }
    });
    
    function getUsernameFromToken(token){
        return token;
    }
    
    io.on("connection", function(socket){  console.log(socket.id);
        socket.on("send-message", function (message, room){
            if(room === ""){
                socket.broadcast.emit("receive-message", message);
            }
            else{
                socket.to(room).emit("receive-messag", message);
            }
    
            socket.on("join-room", function(room, res){
                socket.join(room);
                res(`Joined ${room}`);
            });
        });
        socket.on("ping", n => console.log(n));
    });    
}

export {socket1, socket2, socket3, socket4}