/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";

import { useState, useEffect, useMemo } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Navbar from "~/components/navbar";
import NotesModal from "~/components/notesmdl";

import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";

import config from "config";
import Spinner from "~/components/spinner";
import BackPage from "~/components/back_navigation";

function Note({ noteID, title, details, links, deleteNote }: { noteID: string, title: string, details: string, links: any[], deleteNote: any }) {
    return (
        <li className="card w-96 bg-primary text-primary-content prose glass shadow-xl">
            <div className="card-body">
                <div className="flex w-full justify-between">
                    <h2 className="card-title capitalize text-primary-content">{title}</h2>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn m-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box  justify-start w-24">
                            <li><a>Edit</a></li>
                            <li > <a onClick={
                                async () => {
                                    const result = await deleteNote(noteID);
                                    console.log(result.data);

                                }
                            } >delete</a></li>
                        </ul>
                    </div>
                </div>

                <p>{details}</p>
                <div className="card-actions ">

                    {
                        links.map((link, index) => {
                            //useMemo(index)
                            return (
                                <a key={index} href={link.url} className="btn btn-primary">link {index}</a>
                            )
                        })
                    }

                </div>
            </div>
        </li>
    )
}

function NoteList({ list, remove, refresh }: { list: any, remove: any, refresh: any }) {
    const [parent, enableAnimations] = useAutoAnimate({ duration: 300 })
    const deleteNote = async (id: string) => {
        try {
            const deletedNote = await axios.delete(`${config.backendApiUrl}/projects/notes/${id}`);
            //console.log(`deleted ${deletedNote}`);
            const note = deletedNote.data.notes;
            remove(note.id)
            return deleteNote;
            // refresh(true)
        } catch (error) {
            console.log(error);
        }

    };



    return (
        <ul ref={parent} className="grid grid-cols-1 md:grid-cols-3 gap-y-10 justify-center">
            {
                list && list.map(
                    (note: any) => (
                        <Note
                            key={note.id}
                            noteID={note.id}
                            title={note.title}
                            details={note.details}

                            deleteNote={deleteNote}
                            links={note.link}
                        />
                    )
                )
            }
        </ul>
    )
}



export default function Research() {
    const router = useRouter()
    const projectID: string = String(router.query.slug);
    const [user, loading] = useUser()
    const [notes, setNotes] = useState<any[] | null>(null)
    // const [notes, changeID] = useNotes()
    const [sprints, setID] = useSprint()
    const [refresh, setRefresh] = useState(true)

    const getResponse = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/notes/${projectID}`
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
    const addNotes = (note: any) => {

        setNotes((prev: any) => [...prev, note])
    }

    const removeNotes = (noteID: any) => {
        const noteList = notes?.filter((note) => note.id !== noteID);
        if (noteList)
            setNotes(noteList);
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

        }, [projectID, notes])
    return (
        <div>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main className="container mx-auto px-7 ">
                {!refresh ? (<BackPage link={`/project/${projectID}`} name={`Back to Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                <div className="flex flex-row mx-auto row-gap-2 mb-10">
                    <button onClick={
                        () => {
                            const modalElement: any = document.getElementById('my_modal_2')
                            modalElement.showModal()
                            setRefresh(true)
                        }
                    } className="btn btn-primary">Add Note</button>

                </div>

                <div className="container  mx-auto mb-24">
                    {notes != null ? (<NoteList list={notes} remove={removeNotes} refresh={(val: boolean) => setRefresh(val)} />) : (<Spinner />)}
                </div>
            </main>
            <NotesModal projectID={projectID} addNotes={addNotes} userID={user?.id} sprints={sprints} refresh={(val: boolean) => setRefresh(val)} />
        </div>
    )
}