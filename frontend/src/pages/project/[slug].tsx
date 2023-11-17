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

function MenuCard({ github, projectID }: { github: any, projectID: string }) {
    if (github === null) {
        return (
            <div className="card  bg-neutral-focus w-80 shadow-xl  h-56 ">
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
        <div className="card  bg-neutral-focus w-80  shadow-xl  h-56 ">
            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Github</h2>
                <div className="flex flex-col">
                    <div>
                        <Link href={`/project/commits/${projectID}`} className="btn btn-link">see commits</Link>
                    </div>
                    <div>
                        <Link href={`/project/issues/${projectID}`} className="btn btn-link">see issues</Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

function ResearchCard({ projectID }: { projectID: string }) {
    // console.log(github);
    return (
        <div className="card  bg-neutral-focus w-80  shadow-xl  h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research</h2>
                <div>
                    <Link href={`/project/research/${projectID}`} className="btn btn-link">See Bookmarks</Link>
                </div>

            </div>

        </div>
    )
}

function SprintCard({ projectID }: { projectID: string }) {
    // console.log(github);
    return (
        <div className="card  bg-neutral-focus w-80  shadow-xl h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Milestones/Sprints</h2>
                <div>
                    <p>Setup your project's milestone's here</p>
                    <Link className="btn btn-link" href={`/project/sprint/${projectID}`}  >setup/see </Link>
                </div>


            </div>

        </div>
    )
}

function ChatCard({ projectID }: { projectID: string }) {
    // console.log(github);
    return (
        <div className="card  bg-neutral-focus w-80  shadow-xl h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title"> Info/Communication</h2>
                <div>
                    <Link href={`/project/chat/${projectID}`} className="btn btn-link">See Chat</Link>
                </div>
                <div>
                    <Link href={`/project/member/${projectID}`} className="btn btn-link">Add/See Member</Link>

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
            router.push("/home")
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


        }, [projectID, user, setID]);

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
                            <h1 className="text-4xl uppercase mb-2">{projectData?.name} PROJECT</h1>
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
                </main>
                <RepoModal projectID={projectID} />
            </div>
        </>
    )

}