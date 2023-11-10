/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import NotesModal from "~/components/notesmdl";

import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";

function NoteList({ list ,refresh }: { list: any , refresh:any }) {
    const deleteNote = async (id: string) => {
        try {
            const deletedNote = await axios.delete(`http://localhost:5001/projects/notes/${id}`);
            console.log(`deleted ${deletedNote}`);
             refresh(true)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="grid grid-cols-2 justify-center">
            {
                list && list.map(
                    (note: any) => (
                        <div className="flex flex-row justify-between w-72 bg-primary p-4 border mb-4" key={note.id}>
                            <div>
                                <h3 className="text-2lg text-white font-bold"> {note.title}</h3>
                                <p className="text-white">{note.details}</p>
                                <a className="btn btn-link text-white" target="_blank" href={note.link[0].url}>Link</a>
                            </div>
                            <div>
                                <button onClick={
                                    () => {
                                        deleteNote(note.id)

                                    }
                                } className="btn btn-link text-gray-100">delete</button>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}



export default function Research() {
    const router = useRouter()
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    const [notes, setNotes] = useState([])
    // const [notes, changeID] = useNotes()
    const [sprints, setID] = useSprint()
    const [refresh, setRefresh] = useState(true)

    const getResponse = async () => {
        try {
            const reqUrl = `http://localhost:5001/projects/notes/${projectID}`
            const results = await axios.get(reqUrl)

            console.log(results.data)
            setNotes(results.data.notes)
            setRefresh(false)

        } catch (error) {
            //we failed to get notes for some reason
            //setNotes(null);
            setRefresh(true)

        }
    }

    useEffect(
        () => {
            if (user != null && projectID != null && setID != null) {

                //    changeID(projectID);
                setID(projectID)
                // setRefresh(false)

            }

            if (refresh) {
                getResponse()
            }

        }, [projectID,refresh])
    return (
        <div>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main className="container mx-auto">
                <div className="flex flex-row row-gap-2 mb-10">
                    <button onClick={
                        () => {
                            const modalElement: any = document.getElementById('my_modal_2')
                            modalElement.showModal()
                            setRefresh(true)
                        }
                    } className="btn btn-primary">Add Note</button>

                </div>
                <div className="container">
                    <NoteList list={notes} refresh={(val:boolean)=>setRefresh(val)} />
                </div>
            </main>
            <NotesModal projectID={projectID} userID={user?.id} sprints={sprints}  refresh={(val:boolean)=>setRefresh(val)}  />
        </div>
    )
}