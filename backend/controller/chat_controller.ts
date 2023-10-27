import { Namespace, Socket } from "socket.io";
import { Dictionary } from "../interfaces/interfaces";

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
                socket.to(data.room).emit(data.message)
            })

            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected`);
            });

        });
    }


    getRooms(){
        return this.rooms
    }
}