/* eslint-disable */
/**
 * @fileoverview Initiates connection to the server socket and joins a projects chat rooom
 */
import { useEffect, useState } from "react";
import { io } from "socket.io-client"

import config from "config";


const useChatSocket = (projectID: string) => {
    const [socket, setSocket] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);  // tells frontend when socket is ready

    useEffect(
        () => {

            // only join a chat room if we have a valid project ID also doesnt create a new socket 
            // if socket is already initiated
            if (projectID !== undefined && projectID != null && projectID != "undefined" && !socket) {
                const chatSocket = io(`${config.backendApiUrl}/chat`);
                setSocket(chatSocket)
                chatSocket.emit("join", projectID);
                setLoading(false)
            } else {
                console.log("no")
            }




        }, [projectID]
    )
    return [socket, loading];
}

export default useChatSocket;