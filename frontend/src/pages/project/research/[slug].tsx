/* eslint-disable */
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import NotesModal from "~/components/notesmdl";
import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";
import config from "config";
import Spinner from "~/components/spinner";
import BackPage from "~/components/back_navigation";
import UpdateNote from "~/components/update_note_modal";
import DeleteNote from "~/components/delete_note_modal";
import Drawer from "~/components/drawer";


function Note({ noteID, title, details, links, update, deleteNote }: { noteID: string, title: string, details: string, links: any[], deleteNote: any, update: any }) {
    return (
        <li className="card w-96 h-80 bg-primary text-primary-content prose glass shadow-xl">
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
                            <li>
                                <a
                                    onClick={
                                        () => {
                                            update(noteID); //note to update
                                            const modalElement: any = document.getElementById('update_note');
                                            modalElement.showModal();
                                        }
                                    }
                                >Edit
                                </a>
                            </li>
                            <li >
                                <a
                                    onClick={
                                        () => {
                                            deleteNote(noteID);
                                            const modalElement: any = document.getElementById('del_note');
                                            modalElement.showModal();

                                        }
                                    }
                                >
                                    delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-clip overflow-hidden ...">{details}</p>
                <div className="card-actions ">

                    {
                        links.map((link) => {
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    className="btn btn-primary"
                                >
                                    Resource
                                </a>
                            )
                        })
                    }

                </div>
            </div>
        </li>
    )
}

function NoteList({ list, remove, setUpdateNote }: { readonly list: any, readonly remove: any, readonly setUpdateNote: any }) {
    const [parent, enableAnimations] = useAutoAnimate({ duration: 300 })




    return (
        <ul ref={parent} className="grid grid-cols-1 md:grid-cols-3 gap-y-10 justify-center">
            {
             list.map(
                    (note: any) => (
                        <Note
                            key={note.id}
                            noteID={note.id}
                            title={note.title}
                            details={note.details}
                            update={setUpdateNote}
                            deleteNote={remove}
                            links={note.link}
                        />
                    )
                )
            }
        </ul>
    )
}

function SearchBar({ search, changeTopic, milestone, topic, sprints, changeMilestone, reset }: { search: any, changeTopic: any, milestone: string, topic: string, sprints: any, changeMilestone: any, reset: any }) {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="flex flex-col px-7 md:flex-row justify-between w-full md:w-3/4">
            <input
                ref={inputRef}
                type="text"
                placeholder="search for bookmark"
                className="input input-bordered w-full max-w-xs mr-5"
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        const topicTxt = event.target.value;
                        changeTopic(topicTxt);
                    }
                }
            />
            <select
                className="select select-bordered w-full max-w-xs"
                ref={selectRef}
                onChange={
                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                        const milestoneTxt = event.target.value;
                        changeMilestone(milestoneTxt)
                    }
                }
            >
                <option disabled selected>Filter  by Sprint/Milestone</option>
                <option value={""}>Any Sprint</option>
                {
                    sprints?.map(
                        (sprint: any) => (
                            <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                        )
                    )
                }
            </select>
            <div className="flex flex-row w-1/5 justify-between ">
                <button className="btn  btn-accent  " onClick={() => search()}>Search</button>
                <button
                    className="btn"
                    onClick={
                        () => {
                            reset();
                            if (inputRef && inputRef.current) {
                                inputRef.current.value = "";
                            }
                            if (selectRef && selectRef.current) {
                                selectRef.current.value = "";
                            }
                        }
                    }
                >reset filter
                </button>
            </div>
        </div>
    )
}

export default function Research() {
    const router = useRouter()
    const projectID = router.query.slug;
    const [user, loading] = useUser();
    const [notes, setNotes] = useState<any[]|null>(null);
    const [filteredNotes, setFilteredNotes] = useState<any[]>([])
    const [sprints, setID] = useSprint();
    const [searchTopic, setSearchTopic] = useState<string>("")
    const [searchMilestone, setSearchMilestone] = useState<string>("")
    const [projectIDstr, setProjectIDstr] = useState("")
    const [editNoteID, setEditNoteID] = useState("")
    const [deleteNoteID, setDeleteNoteID] = useState("")
    const [noteEdit, setNoteEdit] = useState<any>(null)

    /**
     * getResponse
     * gets notes from server and sets note state
     */
    const getResponse = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/notes/${projectID}`;
            const results = await axios.get(reqUrl);
            setNotes(results.data.notes);
            setFilteredNotes(results.data.notes);
        } catch (error) {
            //we failed to get notes for some reason

            console.log(error)

        }
    }

    /**
     * addNotes
     * add note to note list afeter server response
     * @param note 
     */
    const addNotes = (note: any) => {
        setNotes((prev: any) => [...prev, note])
        setFilteredNotes((prev: any) => [...prev, note]);
    }

    /**
     * updateNote
     * updates note in notelist after server response
     * @param updateNote 
     */
    const updateNotes = (updateNote: any) => {
        if (notes) {
            const index = notes.findIndex((note) => note.id == updateNote.id)
            console.log(index)
            if (index != -1) {
                const updatedList = [...notes];
                updatedList[index] = updateNote;
                setNotes(updatedList);
                setFilteredNotes(updatedList);
            }
        }
    }

    /**
     * setUpdateNote
     * get notes user is trying to edit and prepares it for update modal
     * @param noteID 
     */
    const setUpdateNote = (noteID: string) => {
        setEditNoteID(noteID)
        const note = notes?.filter((editNote) => {
            return editNote.id == noteID;
        })
        if (note?.length == 1) {
            console.log(note[0]);
            setNoteEdit(note[0])
        }
    }

    /**
     * removeNotes
     * removes deleted note from note list
     * @param noteID 
     */
    const removeNotes = (noteID: any) => {
        const noteList = notes?.filter((note) => note.id !== noteID);
        // if a result exists update notes
        if (noteList) {
            setNotes(noteList);
            setFilteredNotes(noteList);
        }

    }

    /**
     * deleteNote
     * sets note user is trying to delete into state
     * @param id 
     */
    const deleteNote = (id: string) => {
        setDeleteNoteID(id);
    }


    /**
     * search
     * searches through notes based on user filters
     */
    const search = () => {
        let results;
        results = notes?.filter((note) => {
            return (
                (note.title.toLowerCase().includes(searchTopic.toLowerCase()) || note.details.toLowerCase().includes(searchTopic.toLowerCase())) && note.sprintID.toLowerCase().includes(searchMilestone)
            );
        })





        if (results) {
            // setchangeTopicedNotes(results);
            setFilteredNotes(results);
        }


    }

    /**
     * changeTopic
     * gets topic filter user set in input
     * @param topic 
     */
    const changeTopic = (topic: string) => {

        setSearchTopic(topic)

    }
    /**
     * changeMilestone
     * get milestone/sprint filter from user input
     * @param milestone 
     */
    const changeMilestone = (milestone: string) => {
        setSearchMilestone(milestone);
        if (milestone == "") {
            reset();
        }
    }

    /**
     * reset
     * reset search filters and resets list 
     */
    const reset = () => {
        if (notes)
            setFilteredNotes(notes)
    }


    useEffect(
        () => {
            if (projectID!=null && setID != null && notes ==null) {
                setID(projectID as string);
                setProjectIDstr(projectID as string);
                getResponse();
            }
        }, [projectID,notes])

    return (
        <div >
            <Head>
                <title>Research | DevDiaries </title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Drawer userName={user?.name && user?.id ? `${user.name}#${user.id}` : ""}>
                <main className="container mx-auto   ">

                    {projectID != "" ? (<div className="px-7"><BackPage link={`/project/${projectIDstr}`} name={`Back to Project page`} /></div>) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                    <div className="flex flex-col  mx-auto row-gap-2 mb-10 ">
                        <div className="prose pl-7 mb-5">
                            <h1 className=" uppercase mb-2">Research Notes</h1>
                            <p className="text-xl ">Create notes for later reference for you and your team.</p>
                        </div>

                        <div className="flex flex-row justify-between mb-5 px-7">
                            <button
                                onClick={
                                    () => {
                                        const modalElement: any = document.getElementById('my_modal_2');
                                        modalElement.showModal();
                                    }
                                }
                                className="btn btn-primary"
                            >
                                Add Note
                            </button>
                        </div>
                        <SearchBar
                            sprints={sprints}
                            changeTopic={changeTopic}
                            search={search}
                            changeMilestone={changeMilestone}
                            milestone={searchMilestone}
                            topic={searchTopic}
                            reset={reset}
                        />

                    </div>

                    <div className="container bg-base-100  mx-auto mb-24 px-7">
                        {projectID ? (<NoteList list={filteredNotes} remove={deleteNote} setUpdateNote={setUpdateNote} />) : (<Spinner />)}
                    </div>
                </main>
                <NotesModal
                    projectID={projectIDstr}
                    addNotes={addNotes}
                    userID={user?.id}
                    sprints={sprints}
                />
                <UpdateNote
                    noteID={editNoteID}
                    note={noteEdit}
                    projectID={projectIDstr}
                    update={updateNotes}
                    userID={user?.id}
                    sprints={sprints}
                />
                <DeleteNote
                    id={deleteNoteID}
                    remove={removeNotes}
                />
            </Drawer>
        </div>
    )
}