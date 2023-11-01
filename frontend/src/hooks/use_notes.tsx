/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";




const useNotes = () => {
    const [notes, setNotes] = useState(null);
    const [projectID, setProjectID] = useState("")
    const [refreshNotes, setRefreshNotes] = useState(true)


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
          //  setRefreshNotes(false)

        } catch (error) {
            //we failed to get notes for some reason
            //setNotes(null);
           // setRefreshNotes(true)

        }

    }
    useEffect(
        () => {

            const getNotes = async () => {
                if (projectID != undefined) {
                    const results = await getResponse();
                }
                // console.log(results)
            }

            getNotes()
            console.log(notes)



        },
    )
    return [notes, changeID];
}

export default useNotes;