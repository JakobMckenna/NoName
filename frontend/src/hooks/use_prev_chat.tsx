/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";

const usePrevChat = (projectID: string) => {
    const [response, setResponse] = useState<any>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const getResponse = async () => {
        const reqUrl = `${config.backendApiUrl}/projects/chat/${projectID}`
        const results = await axios.get(reqUrl)
        console.log("why")
        console.log(results.data.messages)
        
        setResponse(results.data.messages)
        return results
    }
    useEffect(
        () => {
            
                getResponse()
               


        },[projectID]
    )
    return [response, isLoading];
}

export default usePrevChat;