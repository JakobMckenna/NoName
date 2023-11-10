/* eslint-disable */
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client"

interface ChatSocket{
    socket:Socket,
    loading:boolean
}

const useChatSocket = (projectID:string)  => {
    const [socket, setSocket] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(
        () => {
            if(projectID!==undefined || !socket)
            {
                const chatSocket = io("http://localhost:5001/chat");
                setSocket(chatSocket)
                chatSocket.emit("join", projectID);
                setLoading(false)
            }else{
                console.log("no")
            }

            


        },[projectID]
    )
    return [socket, loading];
}

export default useChatSocket;