/* eslint-disable */
/**
 * @fileoverview This react hook retrieves messages saved on the server  from a previous  
 * session
 */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";

const usePrevChat = () => {
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [roomID, setRoomID] = useState<string | null>(null);


    /**
     * getResponse 
     * sets state for the messages previousily saved from previous chat room sessions.
     * Also sets loading to false to show that a messages from the server is ready.
     */
    const getResponse = async () => {
        try {
            if (roomID != null) {
                const reqUrl = `${config.backendApiUrl}/projects/chat/${roomID}`;
                const results = await axios.get(reqUrl);
                console.log(results.data.messages);
                setResponse(results.data.messages);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {

            //only get response when chat room ID has a valid value
            if (roomID != undefined || roomID != "undefined" || roomID != null) {
                getResponse();
            }

        }, [roomID]
    )
    return [response, isLoading, setRoomID];
}

export default usePrevChat;