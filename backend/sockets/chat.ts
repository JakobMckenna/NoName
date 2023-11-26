import { Server, Socket } from "socket.io";
import ChatController from "../controller/chat_controller";
/**
 * Chat
 * this is declared namespace for the chat socket at http://host:port/chat
 * the only http route on the server that is web socket protocal
 */
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