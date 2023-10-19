import axios from "axios";
import { useEffect, useState } from "react";




const useNotes = ({ projectID }:any) => {
    const [notes, setNotes] = useState(null);

    const getResponse = async () => {
        const reqUrl = `http://localhost:5000/users/projects/notes/${projectID}`
        const results = await axios.get(reqUrl)
        console.log(results.data)
        setNotes(results.data)
    }
    useEffect(
        () => {

           async ()=> await getResponse()
           console.log(notes)

        }, [projectID],
    )
    return notes;
}

export default useNotes;