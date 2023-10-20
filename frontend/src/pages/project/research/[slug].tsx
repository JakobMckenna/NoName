import axios from "axios";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import NotesModal from "~/components/notesmdl";
import useNotes from "~/hooks/use_notes";
import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";



export default function Research() {
    const router = useRouter()
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    const [notes, changeID] = useNotes()
    const [sprints,setID] = useSprint()
    useEffect(
        () => {
            if (user != null && projectID != null && changeID && setID!=null) {
                
                changeID(projectID);
                setID(projectID)
            }


        }, [loading, user,projectID]
    )
    return (
        <div>
            <Navbar userName={user?.email} />
            <main className="container ml-80 pl-10">
                <div className="flex flex-row row-gap-2">
                    <button onClick={
                        () => { 
                            const modalElement:any =document.getElementById('my_modal_2')
                            modalElement.showModal() 
                        }
                    } className="btn btn-primary">Add Note</button>

                </div>
            </main>
            <NotesModal projectID={projectID} />
        </div>
    )
}