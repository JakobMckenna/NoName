import axios from "axios";
import { useEffect, useState } from "react";



function getLatestCommits() {

}

const useGetReq = ({ url }:any) => {
    const [response, setResponse] = useState(null);

    const getResponse = async () => {
        const reqUrl = `${url}`
        const results = await axios.get(url)
        console.log(results.data)
        setResponse(results.data)
    }
    useEffect(
        () => {

           async ()=> await getResponse()
           console.log(response)

        }, [],
    )
    return response;
}

export default useGetReq;