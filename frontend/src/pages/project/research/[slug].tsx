/* eslint-disable */
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

import { useState, useEffect, useMemo, useRef } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Navbar from "~/components/navbar";
import NotesModal from "~/components/notesmdl";

import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";

import config from "config";
import Spinner from "~/components/spinner";
import BackPage from "~/components/back_navigation";
import UpdateNote from "~/components/update_note_modal";
import { boolean } from "yup";


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
                                            update(noteID)
                                            const modalElement: any = document.getElementById('update_note')
                                            modalElement.showModal()
                                        }
                                    }
                                >Edit
                                </a>
                            </li>
                            <li >
                                <a
                                    onClick={
                                        async () => {
                                            const result = await deleteNote(noteID);
                                            console.log(result.data);

                                        }
                                    } >delete</a></li>
                        </ul>
                    </div>
                </div>

                <p className="text-clip overflow-hidden ...">{details}</p>
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

function NoteList({ list, remove, refresh, setUpdateNote }: { list: any, remove: any, refresh: any, setUpdateNote: any }) {
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
                            update={setUpdateNote}
                            deleteNote={deleteNote}
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
                <option disabled selected>Filter  by Sprint</option>
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
    const [notes, setNotes] = useState<any[] | null>(null);
    const [filteredNotes, setFilteredNotes] = useState<any[]>([])
    // const [notes, changeID] = useNotes()
    const [sprints, setID] = useSprint();
    const [refresh, setRefresh] = useState(true);
    const [searchTopic, setSearchTopic] = useState<string>("")
    const [searchMilestone, setSearchMilestone] = useState<string>("")
    const [projectIDstr, setProjectIDstr] = useState("")
    const [editNoteID, setEditNoteID] = useState("")
    const [noteEdit , setNoteEdit]= useState<any>(null)

    const getResponse = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/notes/${projectID}`;
            const results = await axios.get(reqUrl);

            console.log(results.data);
            setNotes(results.data.notes);
            setFilteredNotes(results.data.notes);
            setRefresh(false);

        } catch (error) {
            //we failed to get notes for some reason
            //setNotes(null);
            setRefresh(true);

        }
    }

    const addNotes = (note: any) => {

        setNotes((prev: any) => [...prev, note])
    }

    const setUpdateNote = (noteID: string) => {
        setEditNoteID(noteID)
        const note = notes?.filter((editNote)=>{
            return editNote.id == noteID;
        })
        if (note?.length==1){
            console.log(note[0]);
            setNoteEdit(note[0])
        }
    }

    const removeNotes = (noteID: any) => {
        const noteList = notes?.filter((note) => note.id !== noteID);
        if (noteList)
        {
            
            setNotes(noteList);
            
        }
        
    }

    

    

    const search = () => {
        let results
        results = notes?.filter((note) => {
            return (
                (note.title.toLowerCase().includes(searchTopic.toLowerCase()) || note.details.toLowerCase().includes(searchTopic.toLowerCase())) && note.sprintID.toLowerCase().includes(searchMilestone)
            )
        })





        if (results) {
            // setchangeTopicedNotes(results);
            setFilteredNotes(results);
        }


    }

    const changeTopic = (topic: string) => {

        setSearchTopic(topic)
        if (topic == "") {
            reset();
        }
    }

    const changeMilestone = (milestone: string) => {
        setSearchMilestone(milestone);
        if (milestone == "") {
            reset();
        }
    }



    const reset = () => {
        if (notes)
            setFilteredNotes(notes)
    }
    useEffect(
        () => {
            if (user != null && projectID != null && setID != null) {
                const id = String(projectID);
                //    changeID(projectID);
                setID(id);
                setProjectIDstr(id);
                // setRefresh(false)

            }

            if (notes==null || filteredNotes.length==0) {
                getResponse()
            }else{
                if(notes)
                    setFilteredNotes(notes);
            }

        }, [notes])
    return (
        <div >
            <Head>
                <title>Research | DevDiaries </title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main className="container mx-auto   ">
                {projectID != "" ? (<div className="px-7"><BackPage link={`/project/${projectIDstr}`} name={`Back to Project page`} /></div>) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                <div className="flex flex-col  mx-auto row-gap-2 mb-10 ">
                    <div className="flex flex-row justify-between mb-5 px-7">
                        <button
                            onClick={
                                () => {
                                    const modalElement: any = document.getElementById('my_modal_2')
                                    modalElement.showModal()
                                    // setRefresh(true)
                                }
                            }
                            className="btn btn-primary"
                        >
                            Add Note
                        </button>
                    </div>
                    <SearchBar sprints={sprints} changeTopic={changeTopic} search={search} changeMilestone={changeMilestone} milestone={searchMilestone} topic={searchTopic} reset={reset} />

                </div>

                <div className="container bg-base-100  mx-auto mb-24 px-7">
                    {notes != null ? (<NoteList list={filteredNotes} remove={removeNotes} setUpdateNote={setUpdateNote} refresh={(val: boolean) => setRefresh(val)} />) : (<Spinner />)}
                </div>
            </main>
            <NotesModal projectID={projectIDstr} addNotes={addNotes} userID={user?.id} sprints={sprints} refresh={(val: boolean) => setRefresh(val)} />
            <UpdateNote noteID={editNoteID} note={noteEdit} projectID={projectIDstr} addNotes={addNotes} userID={user?.id} sprints={sprints} refresh={(val: boolean) => setRefresh(val)} />
        </div>
    )
}