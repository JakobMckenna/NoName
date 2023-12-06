/* eslint-disable */
/**
 * @fileoverview this 
 */
import { useEffect, useState } from "react";
import {  io } from "socket.io-client"

import config from "config";


const useChatSocket = (projectID:string)  => {
    const [socket, setSocket] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(
        () => {
            if(projectID!==undefined || !socket)
            {
                const chatSocket = io(`${config.backendApiUrl}/chat`);
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