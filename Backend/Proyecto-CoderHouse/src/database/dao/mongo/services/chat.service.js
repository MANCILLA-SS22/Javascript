import {modelChat} from "../models/chat.model.js"

export class ChatManager{
    async saveMessages(data){
        try {
            return await modelChat.create(data);
        } catch (error) {
            return error;
        }
    }

    async getMessages(){
        try {
            return await modelChat.find();
        } catch (error) {
            return error;
        }
    }
}