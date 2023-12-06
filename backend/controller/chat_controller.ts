/**
 * @fileoverview chat controller handles incomming socket connections
 */
import { Namespace } from "socket.io";
import { Dictionary } from "../interfaces/interfaces";
import ChatService from "../services/chat_service";
/**
 * Chat controller
 * handles incomming connections and disconnects and chat room creation
 */
export default class ChatController {

    readonly rooms: Dictionary = {}

    constructor(chatNameSpace: Namespace) {

        // when user connects to the socket
        chatNameSpace.on('connection', (socket) => {
            console.log('a user connected');

            // creates project chat room based on project ID
            socket.on('create', (room: string) => {
                this.rooms[room] = room;
                socket.join(room);
                console.log(`create room ${room}`)
            })

            // if room exists user will join chat room
            socket.on('join', (room: string) => {
                socket.join(room)
                console.log(`joined room ${room}`)
            })

            //when user leaves a chat room
            socket.on('leave', (room: string) => {
                socket.leave(room)
                console.log(`left room ${room}`)
            })


            // when user sends message it broadcast the message to the request chat room
            socket.on('message', (data: any) => {
                console.log(data.message)
                console.log(data.room)
                chatNameSpace.to(data.room).emit("message", { id: ChatService.randomChatID(), message: data.message, user: { id: data.userID, name: data.name }, timestamp: ChatService.sendTime() })
                this.save(data.message, data.room, data.userID)
            })

            // when user disconnects from a socket 
            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected`);
            });

        });
    }
    
    /**
     * Saves this saves message to database 
     * @param message  is the message being saved
     * @param projectID the chat room it belongs to
     * @param userID is the user who sent the message
     */
    save(message: string, projectID: string, userID: number) {
        const savedMsg = async () => {
            const result = await ChatService.save(message, projectID, userID)
            return result;
        }
        savedMsg();
    }


    getRooms() {
        return this.rooms
    }

}

