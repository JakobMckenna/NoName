/**
 * @fileoverview This is the project page for individual project pages and is dynaically rendered depending on url's params
 * if a user who has not logged in tries to login to this page they'll be sent back to sign up page
 */

/* eslint-disable */
import useUser from "~/hooks/use_user"
import { useRouter } from 'next/router'
import Navbar from "~/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import RepoModal from "~/components/repomdl";
import Link from "next/link";
import useSprint from "~/hooks/use_sprint";
import Head from "next/head";
import config from "config";
import DeleteModal from "~/components/delete_project_modal";
import BackPage from "~/components/back_navigation";


function LoadingCard() {
    return (
        <div className="card  skeleton  bg-primary glass text-primary-content  w-80  shadow-xl h-56 ">
            <div className="card-body items-center text-center h-full">
                <h2 className="card-title skeleton h-4   w-28"></h2>
                <div>
                    <p  className="link skeleton h-4   w-28"></p>
                </div>
                <div>
                    <p  className="link skeleton h-4   w-28"></p>
                </div>

            </div>
        </div>
    )
}

function MenuCard({ github, projectID }: { github: any, projectID: string }) {
    if (github === null) {
        return (
            <div className="card bg-primary glass text-primary-content  w-80 shadow-xl  h-56 ">
                <div className="card-body items-center text-center h-full">
                    <h2 className="card-title">Github</h2>
                    <div className="card-actions justify-start">
                        <button onClick={() => {
                            const modal: any = document.getElementById('my_modal_4');
                            if (modal) {
                                modal?.showModal();
                            }
                        }} className="link">setup github</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="card bg-primary glass text-primary-content  w-80  shadow-xl  h-56 ">
            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Github</h2>
                <div className="flex flex-col">
                    <div>
                        <Link href={`/project/commits/${projectID}`} className="link ">see commits</Link>
                    </div>
                    <div>
                        <Link href={`/project/issues/${projectID}`} className="link">see issues</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ResearchCard({ projectID }: { projectID: string }) {
    return (
        <div className="card bg-primary glass text-primary-content  w-80  shadow-xl  h-56 ">
            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research</h2>
                <div>
                    <p className="mb-3">Organize your research here for you and your mates</p>
                    <Link href={`/project/research/${projectID}`} className="link">See Bookmarks</Link>
                </div>
            </div>
        </div>
    )
}

function SprintCard({ projectID }: { projectID: string }) {
    // console.log(github);
    return (
        <div className="card  bg-primary glass text-primary-content w-80  shadow-xl h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Milestones/Sprints</h2>
                <div>
                    <p>Setup your project's milestone's here</p>
                    <Link className="link" href={`/project/sprint/${projectID}`}  >setup/see </Link>
                </div>


            </div>

        </div>
    )
}

function ChatCard({ projectID }: { projectID: string }) {
    return (
        <div className="card  bg-primary glass text-primary-content  w-80  shadow-xl h-56 ">
            <div className="card-body items-center text-center h-full">
                <h2 className="card-title"> Info/Communication</h2>
                <div>
                    <Link href={`/project/chat/${projectID}`} className="link">See Chat</Link>
                </div>
                <div>
                    <Link href={`/project/member/${projectID}`} className="link">Add/See Member</Link>
                </div>
            </div>
        </div>
    )
}

function Header({ projectData, userID, owner }: { projectData: any, userID: number | null, owner: number | null }) {
    return (
        <div className="ml-10 mt-3 md:ml-0 md:mt-0  prose  ">
            <BackPage link="/home" name="Back To Home Page" />
            <div className="flex flex-col justify-start max-w-xl ">

                <div className="flex flex-col md:flex-row items-baseline max-w-lg text-center">

                    <h1 className="uppercase mb-2">{projectData ? `${projectData.name} PROJECT` : (<div className="skeleton h-9 w-96"></div>)} </h1>
                    {
                        userID && owner && (<div className="tooltip tooltip-right" data-tip={userID === owner ? "Delete Project" : "Only Owner Can Delete This Project"}>
                            <button
                                className=" btn btn-primary   
                                    btn-square btn-outline btn-sm ml-5"
                                onClick={
                                    () => {
                                        const modal: any = document.getElementById('del_proj');
                                        if (modal) {
                                            modal?.showModal();
                                        }
                                    }

                                }
                                disabled={userID !== owner}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>


                            </button>

                        </div>)
                    }
                </div>



                <p className="text-xl mb-5">Add Sprint to access research notes and setup github to see commits</p>
            </div>
        </div>
    )
}


export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState<any>();
    const [projectIDstr ,setProjectIDstr] = useState<string>("")
    const [github, setGithub] = useState(null);
    const [sprints, setID] = useSprint();
    const projectID = router.query.slug;
    const [owner, setOwner] = useState<number | null>(null)
    const [userID, setUserID] = useState<number | null>(null)
    const goToHome = () => {
        router.push("/home")
    }


    // Retrieve project data from backend with project ID from the url params
    const getProjectData = async (id: string) => {
        const reqUrl = `${config.backendApiUrl}/projects/${id}`
        try {
          
            if(id != null || id !=undefined)
            {
            const results = await axios.get(reqUrl);
            // save owner's user ID to compare  with the logged in user's ID
            setOwner(results.data.projects.userId);
            return results.data.projects;
            }

        } catch (error) {
            console.log(error);
            alert(typeof id)
            throw new Error("failed to get project");
        }

    }

    const isProjectIdReady =()=>{
        return projectID!= null || projectID!=undefined
    }

    useEffect(
        () => {
            // retrieve data but only if user data is stored in browser local storage
            if (user != null && user != undefined && projectID != null && projectID != undefined) {
                // store user ID from local storage
                setUserID(user.id)
                // retrieves with project ID project data
                const getData = async () => {
                    try {
                        
                        const results = await getProjectData(String(projectID));
                        // if results  is valid fom serve we will store it in react state
                        if (results && setID != null) {
                            setID(String(projectID));
                            setProjectData(results);
                            setGithub(results.github);
                        }
                        setProjectIDstr(String(projectID))
                    } catch (error) {
                        alert("Project does not exist anymore or the server is down,contact your project owner");
                        router.push("/home");
                    }

                }

                // retrieve project data  from server and save it in state
                getData();
            }
        }, [isProjectIdReady, user]);

    return (
        <div>
            <Head>
                <title>DevDiaries | Project</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar userName={`${user?.name}#${user?.id}`} />

            <main className="flex flex-col items-center justify-center  mb-10    ">

                <Header projectData={projectData} userID={userID} owner={owner} />
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-5 pl-5 md:pl-24  ">

                    <MenuCard github={github} projectID={projectIDstr} />
                    <SprintCard projectID={projectIDstr} />


                    {sprints? (<ResearchCard projectID={projectIDstr} />) : <LoadingCard />}
                    <ChatCard projectID={projectIDstr} />

                </div>


            </main >
            <RepoModal projectID={projectIDstr} />
            <DeleteModal projectID={projectIDstr} home={goToHome} />

        </div>
    )

}