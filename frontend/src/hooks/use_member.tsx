/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";


const useUserProjects = ({ projectID }:{projectID:string}) => {
    const [response, setResponse] = useState<any>(null);

    const getResponse = async () => {
        const reqUrl = `${config.backendApiUrl}/users/projects${projectID}`
        const results = await axios.get(reqUrl)
        console.log(results.data.user)
        setResponse(results.data)
    }
    useEffect(
        () => {

           async ()=> await getResponse()
           console.log(response)

        }, [],
    )
    return [response.member ,response.member.members];
}

export default useUserProjects;