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
                <div>
                    <Link href={`/project/commits/${projectID}`} className="btn btn-link">see commits</Link>
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

function SprintCard({ projectID, sprints }: { projectID: string, sprints: any }) {
    // console.log(github);
    return (
        <div className="card  bg-neutral-focus w-80  shadow-xl h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Sprint</h2>
                <div>
                    {
                        sprints && sprints.map(
                            (sprint: any) => {
                                return (
                                    <div>
                                        Current: {sprint.name}
                                    </div>
                                )
                            }
                        )
                    }

                </div>
                {(sprints === null || sprints.length == 0) &&
                    (
                        <div>
                            <button onClick={() => {
                                const modal: any = document.getElementById('sprint_modal')
                                if (modal) {
                                    modal?.showModal()
                                }

                            }} className="btn btn-link">Add Sprint</button>
                        </div>)
                }

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
        const reqUrl = `http://localhost:5001/projects/${id}`
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
        <div className="overscroll-x-none">
            <Navbar userName={`${user?.name}#${user?.id}`} />

            <main className="container  ">
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
                        <SprintCard projectID={projectID} sprints={sprints} />


                        {sprints && sprints.length > 0 && (<ResearchCard projectID={projectID} />)}
                        <ChatCard projectID={projectID} />

                    </div>
                </div>
            </main>

        </div>
    )

}