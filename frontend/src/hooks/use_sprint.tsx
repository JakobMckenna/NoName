/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

import config from "config";


const useSprint = () => {
    const [sprints, setSprints] = useState(null);
    const [projectID, setProjectID] = useState("")
    const setID: ((arg: string) => void | null | undefined) = (id: string) => {
        setProjectID(id);
    };

    const getResponse = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/sprint/${projectID}`
            console.log(projectID)
            const results = await axios.get(reqUrl)

            setSprints(results.data.sprints)
        } catch (error) {
            //we failed to get notes for some reason
            setSprints(null);
        }

    }
    useEffect(
        () => {

            const sprints = async () => {
                await getResponse();
            }

            if (projectID && projectID != undefined) {
                sprints();
            }


        }, [projectID]);

    return [sprints, setID];
}

export default useSprint;