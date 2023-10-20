import axios from "axios";
import { useEffect, useState } from "react";




const useCommits = () => {
    const [commits, setCommits] = useState(null);
    const [latestCommits, setLatestCommits] = useState(null);
    const [maintainer ,setMaintainer ] = useState("");
    const [project ,setProject ] = useState("");

    const addOwner= (owner:string)=>{
        setMaintainer(owner);
    }

    const addProject= (project:string)=>{
        setProject(project);
    }
    const getCommits = ()=>{

        const url = `http://localhost:5001/github/commits/${maintainer}/${project}`

        axios
        .get(url)
        .then(function (response) {
       //   console.log(response.data.commits);
          setCommits(response.data.commits)
          return response.data.commits;
        });
    }
    useEffect(
        () => {
            if(maintainer!="" && project!="")
                getCommits()

        },[maintainer,project], 
    )
    return [commits, latestCommits,addOwner,addProject];
}

export default useCommits;
