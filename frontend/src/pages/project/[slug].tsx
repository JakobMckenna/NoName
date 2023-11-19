/* eslint-disable */
import useUser from "~/hooks/use_user"
import { useRouter } from 'next/router'
import Navbar from "~/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import RepoModal from "~/components/repomdl";
import Link from "next/link";
import SprintModal from "~/components/sprintmdl";
import useSprint from "~/hooks/use_sprint";
import Head from "next/head";

import config from "config";
import DeleteModal from "~/components/delete_project_modal";

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
                        }} className="btn btn-secondary  btn-link">setup github</button>
                    </div>
                </div>
            </div>
        );
    }

    console.log(github);

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
    // console.log(github);
    return (
        <div className="card bg-primary glass text-primary-content  w-80  shadow-xl  h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research</h2>
                <div>
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
    // console.log(github);
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


export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState<any>();
    const [github, setGithub] = useState(null);
    const [sprints, setID] = useSprint()
    const projectID = String(router.query.slug);

    const goToHome = () => {
        router.push("/home")
    }

    const getProjectData = async (id: string) => {
        const reqUrl = `${config.backendApiUrl}/projects/${id}`
        try {
            if (!id) {
                router.push("/")
            }
            const results = await axios.get(reqUrl)
            //  console.log(results.data.projects)
            return results.data.projects

        } catch (error) {
           // router.push("/home")
           //
        }

    }

    useEffect(
        () => {


            if (user) {
                // console.log
                const getData = async () => {
                    if (projectID != null) {
                        const results = await getProjectData(projectID);
                        if (results && setID != null) {
                            setID(projectID)
                            setProjectData(results);
                            setGithub(results.github);

                        }
                    }
                }

                getData();



            }


        }, [projectID, user]);

    return (
        <>
            <Head>
                <title>DevDiaries | Project</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="overscroll-x-none">
                <Navbar userName={`${user?.name}#${user?.id}`} />
                <main className="container mb-10  ">
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            <div className="flex flex-row items-center " >
                                <h1 className="text-4xl uppercase mb-2">{projectData?.name} PROJECT</h1>
                                <div className="tooltip tooltip-right" data-tip="Delete Project">
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
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>


                                    </button>
                                </div>
                            </div>
                            <div>
                                <p className="text-xl mb-2">Add Sprint to access research notes and setup github to see commits</p>
                            </div>
                        </div>
                    </div>
                    <div className="container max-w-full px-72 ml-6  ">
                        <div className=" grid grid-cols-2 justify-items-center gap-y-8 gap-x-5  ">

                            <MenuCard github={github} projectID={projectID} />
                            <SprintCard projectID={projectID} />


                            {sprints && sprints.length > 0 && (<ResearchCard projectID={projectID} />)}
                            <ChatCard projectID={projectID} />

                        </div>
                    </div>
                </main >
                <RepoModal projectID={projectID} />
                <DeleteModal projectID={projectID} home={goToHome} />
            </div >
        </>
    )

}