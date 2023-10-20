/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";




const useUserProjects = ({ userID }:any) => {
    const [response, setResponse] = useState<any>(null);

    const getResponse = async () => {
        const reqUrl = `http://localhost:5001/users/projects${userID}`
        const results = await axios.get(reqUrl)
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

export default useUserProjects;