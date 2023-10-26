/* eslint-disable */
import { useEffect, useState } from "react";
import { io } from "socket.io-client"


const useChatSocket = (projectID:string) => {
    const [socket, setSocket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {
            if(projectID!=undefined)
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