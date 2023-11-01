/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";




const useNotes = () => {
    const [notes, setNotes] = useState(null);
    const [projectID, setProjectID] = useState("")


    const changeID: ((arg: string) => void | null | undefined) = (id: string) => {
        setProjectID(id);
        //return id;
    };


    const getResponse = async () => {
        try {
            const reqUrl = `http://localhost:5001/projects/notes/${projectID}`
            const results = await axios.get(reqUrl)

            console.log(results.data)
            setNotes(results.data.notes)

        } catch (error) {
            //we failed to get notes for some reason
            setNotes(null);
        }

    }
    useEffect(
        () => {

            const getNotes = async () => {
                const results = await getResponse();
                console.log(results)
            }
            if(projectID!=null ){
                getNotes()
                console.log(notes)
            }
          

        },[notes]
    )
    return [notes, changeID];
}

export default useNotes;