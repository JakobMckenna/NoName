/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import config from "config";


const useCommits = () => {
    const [commits, setCommits] = useState<any[]|null>(null);
  
    const [maintainer, setMaintainer] = useState("");
    const [project, setProject] = useState("");

    const addOwner = (owner: string) => {
        setMaintainer(owner);
    }

    const addProject = (project: string) => {
        setProject(project);
    }
    const getCommits = () => {

        const url = `${config.backendApiUrl}/github/commits/${maintainer}/${project}`

        axios
            .get(url)
            .then(function (response) {
                setCommits(response.data.commits)
                return response.data.commits;
            })
    }
    useEffect(
        () => {
            if (maintainer != "" && project != "")
                getCommits()

        }, [maintainer, project],
    )
    return [commits, addOwner, addProject];
}

export default useCommits;
