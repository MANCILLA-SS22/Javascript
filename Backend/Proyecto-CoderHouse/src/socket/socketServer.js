import express from "express";
import http from "http"
import { Server } from "socket.io";
import {ChatManager} from "../database/dao/mongo/services/chat.service.js";


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);  

const Chat = new ChatManager();

io.on('connection', async function (socket) {
    socket.on("inicio", async function(data){
        socket.broadcast.emit("connected", data);
		// const messages = await Chat.getMessages();
        // io.emit("messagesLogs", messages);
    });

    socket.on("message", async function(data){
        Chat.saveMessages(data);
        const messages = await Chat.getMessages();
        io.emit("messagesLogs", messages);
    });
});

export {app, express, httpServer, io};