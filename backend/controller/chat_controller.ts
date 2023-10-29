import { Namespace, Socket } from "socket.io";
import { Dictionary } from "../interfaces/interfaces";
import ChatService from "../services/chat_service";

export default class ChatController {

    readonly rooms:Dictionary = {}

    constructor(chatNameSpace: Namespace) {
        chatNameSpace.on('connection', (socket) => {
            console.log('a user connected');


            socket.on('create', (room: string) => {
                this.rooms[room] = room;
                socket.join(room);
                console.log(`create room ${room}`)
            })

            socket.on('join', (room: string) => {
                socket.join(room)
                console.log(`joined room ${room}`)
            })

            socket.on('leave', (room: string) => {
                socket.leave(room)
                console.log(`left room ${room}`)
            })

            socket.on('message',(data:any)=>{
                console.log(data.message)
                console.log(data.room)
                chatNameSpace.to(data.room).emit("message",{name:data.name,message:data.message,userID:data.userID})
                this.save(data.message,data.room ,data.userID)
            })

            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected`);
            });

        });
    }

    save(message: string, projectID: string, userID: number){
        const savedMsg = async ()=>{
            const result = await ChatService.save(message,projectID,userID)
            return result;
        }
        savedMsg();
    }


    getRooms(){
        return this.rooms
    }

    async getAllPrevMessages(projectID:string){
        try {
            const result = await ChatService.getAll(projectID)
            return result;
        } catch (error) {
            return null
        }
    }
}