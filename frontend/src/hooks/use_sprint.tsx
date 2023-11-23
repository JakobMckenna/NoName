/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";


const useSprint = () => {
    const [sprints, setSprints] = useState(null);
    const [projectID, setProjectID] = useState("")
    const setID:((arg:string)=>void|null|undefined) = (id:string)=>{
        setProjectID(id);
        //return id;
    };

    const getResponse = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/sprint/${projectID}`
           
            const results = await axios.get(reqUrl)
           // console.log(results.data.sprints)
            setSprints(results.data.sprints)
        } catch (error) {
            //we failed to get notes for some reason
            setSprints(null);
        }

    }
    useEffect(
        () => {
           // console.log(projectID)
            const sprints = async () => {
                const results = await getResponse()
                console.log(results)
            }
            if(projectID)
            {
                sprints()
            }
           

        }, [projectID]);
        
    return [sprints,setID];
}

export default useSprint;