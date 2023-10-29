/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";



const usePrevChat = (projectID: string) => {
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const getResponse = async () => {
        const reqUrl = `http://localhost:5001/projects/chat/${projectID}`
        const results = await axios.get(reqUrl)
        console.log(results.data)
        setResponse(results.data.messages)
    }
    useEffect(
        () => {
            if (projectID !== undefined) {
                async ()=> await getResponse()
                console.log(response)

                setLoading(false)
            } else {
                console.log("no")
            }




        }, [projectID]
    )
    return [response, isLoading];
}

export default usePrevChat;