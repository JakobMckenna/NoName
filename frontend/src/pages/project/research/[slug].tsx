import axios from "axios";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import NotesModal from "~/components/notesmdl";
import useNotes from "~/hooks/use_notes";
import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";

function NoteList({ list ,update }: { list: any ,update:any }) {
    const deleteNote =async (id:string)=>{
        try{
            const deletedNote = await axios.delete(`http://localhost:5000/projects/notes/${id}`);
            console.log(`deleted ${deletedNote}`);
        }catch(error){
            console.log(error);
        }

    }
    if (list) {
        return (
            <div className="flex flex-col">
                {
                    list.map(
                        (note: any) => (
                            <div className="flex flex-row justify-between w-72 bg-primary p-4 border mb-4" key={note.id}>
                                <div>
                                    <h3 className="text-2lg text-white font-bold"> {note.title}</h3>
                                    <a className="btn btn-link text-white" target="_blank" href={note.link[0].url}>Link</a>
                               </div>
                               <div>
                                    <button onClick={
                                        ()=>{
                                            deleteNote(note.id)
                                            update()
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
    else {
        return (
            <div>
                Nothing to see here
            </div>
        )
    }
}

export default function Research() {
    const router = useRouter()
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    const [notes, changeID,forceUpadte] = useNotes()
    const [sprints, setID] = useSprint()
    useEffect(
        () => {
            if (user != null && projectID != null && changeID && setID != null && forceUpadte!=null) {

                changeID(projectID);
                setID(projectID)
                forceUpadte("")
            }


        }, [loading, user, projectID]
    )
    return (
        <div>
            <Navbar userName={user?.email} />
            <main className="container ml-80 pl-10">
                <div className="flex flex-row row-gap-2 mb-10">
                    <button onClick={
                        () => {
                            const modalElement: any = document.getElementById('my_modal_2')
                            modalElement.showModal()
                        }
                    } className="btn btn-primary">Add Note</button>
                    
                </div>
                <NoteList list={notes} update={forceUpadte} />
            </main>
            <NotesModal projectID={projectID} userID={user?.id} sprints={sprints} />
        </div>
    )
}