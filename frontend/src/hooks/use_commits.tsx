import axios from "axios";
import { useEffect, useState } from "react";



function getLatestCommits(){

}

const useCommits = ({maintainer ,project}:{maintainer:string , project:string}) => {
    const [commits, setCommits] = useState(null);
    const [latestCommits, setLatestCommits] = useState(null);

    const getCommits = ()=>{
        const url = `http://localhost:5001/github/commits/${maintainer}/${project}`
        axios
        .get(url)
        .then(function (response) {
          console.log(response.data.commits);
          setCommits(response.data.commits)
          return response.data.commits;
        });
    }
    useEffect(
        () => {

           

        },[getCommits], 
    )
    return [commits, latestCommits];
}

export default useCommits;