/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";



const usePrevChat = (projectID: string) => {
    const [response, setResponse] = useState<any>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const getResponse = async () => {
        const reqUrl = `http://localhost:5001/projects/chat/${projectID}`
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