import { Server, Socket } from "socket.io";
import ChatController from "../controller/chat_controller";

export default class Chat{
    controller :ChatController;
    constructor(socket:Server){
        
        const chatNameSpace = socket.of('chat');
        this.controller = new ChatController(chatNameSpace)

    }

    rooms(){
        return this.controller.getRooms();
    }
}