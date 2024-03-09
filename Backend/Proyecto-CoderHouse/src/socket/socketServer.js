import express from "express";
import { Server } from "socket.io";
import http from "http"
import { productService } from "../database/service.js";
import {ChatManager} from "../database/dao/mongo/services/chat.service.js";


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);  

const getProducts = productService.getProducts(); //Persistencia de archivos: El almacenamiento persistente se refiere a la retención de datos de forma no volátil, de modo que sigan estando disponibles incluso después de que un dispositivo o aplicación se apague o reinicie

const Chat = new ChatManager();

io.on('connection', async function (socket) {
	
    socket.emit('product_list', await getProducts); // Se envian los products al momento que se conecta un cliente
	socket.on('product_form', async function (data) {
		Product.addProduct(data);
		io.emit('product_list', await getProducts); // Utiliza io.emit para enviar los productos actualizados a todos los clientes.
	});

    socket.on("inicio", async function(data){
        socket.broadcast.emit("connected", data);
		// const messages = await Chat.getMessages();
        // io.emit("messagesLogs", messages);
    });
    
    socket.on("message", async function(data){
        Chat.saveMessages(data);
        const messages = await Chat.getMessages();
        io.emit("messagesLogs", [data]);
    });
    
    // socket.emit("messages", async function(data){
	// 	return await Chat.getMessages(data);
	// });//Al cargar la pagina, se envia un array vacio. Cuando un usuario nuevo entre o cuando uno actualice el navegador, podra ver el array de mensajes. De lo contrario, aparecera en blanco.
});

export {app, express, httpServer, io};