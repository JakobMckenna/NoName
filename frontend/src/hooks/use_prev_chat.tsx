/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";

const usePrevChat = () => {
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [roomID, setRoomID] = useState<string | null>(null)

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
            if (roomID != undefined || roomID != "undefined" || roomID != null) {
                getResponse();
            }

        }, [roomID]
    )
    return [response, isLoading, setRoomID];
}

export default usePrevChat;