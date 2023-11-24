/* eslint-disable */
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "~/components/navbar";
import SprintModal from "~/components/sprintmdl";
import useUser from "~/hooks/use_user";

import config from "config";
import BackPage from "~/components/back_navigation";
import SprintDelete from "~/components/delete_sprint_modal";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Sprints({ sprints, changeSelected, animate }: any) {
    // console.log(sprints)
    const convDate = (date: string) => {
        const result = new Date(date)
        return result.toLocaleDateString();
    }
    return (
        <div className="flex flex-col">

            <h1 className="text-2xl text-center uppercase mb-2 ">Sprints</h1>
            <ul ref={animate}>
                {
                    sprints && sprints.map(
                        (sprint: any) => {
                            const start = convDate(sprint.start)
                            const end = convDate(sprint.deadline)
                            return (
                                <li key={sprint.id} className="collapse collapse-arrow w-80 bg-base-200">
                                    <input type="radio" name="my-accordion-2" />
                                    <div className="collapse-title capitalize text-xl font-medium">
                                        {sprint.name}
                                    </div>
                                    <div className="collapse-content">
                                        <button
                                            className="btn  btn-primary"
                                            onClick={
                                                () => {
                                                    changeSelected(sprint.id)
                                                    const modal: any = document.getElementById('del_sprint')
                                                    if (modal) {
                                                        modal?.showModal()
                                                    }
                                                }
                                            }


                                        >
                                            Delete Sprint
                                        </button>
                                        <div className="flex flex-row justify-between">
                                            <p>start: {start}</p>
                                            <p>end: {end}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

function MilestoneHero({ sprints, changeSelected, animate }: any) {
    return (
        <div className="flex  flex-col justify-evenly md:flex-row ">
            <div className="card  bg-neutral-focus w-80  shadow-xl h-56 ">
                <div className="card-body items-center text-center h-full">
                    <h2 className="card-title">Create Sprint/Milestone</h2>
                    <button onClick={() => {
                        const modal: any = document.getElementById('sprint_modal')
                        if (modal) {
                            modal?.showModal()
                        }

                    }}
                        className="btn btn-primary"
                    >
                        Mannual Create
                    </button>

                    <button disabled className="btn btn-primary"> Sync with Github</button>
                </div>

            </div>
            <Sprints sprints={sprints} changeSelected={changeSelected} animate={animate} />
        </div>
    )
}

export default function SprintPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    //const [sprints, setID] = useSprint();
    const [sprints, setSprints] = useState<any[]>([]);
    const projectID = router.query.slug;
    const [refresh, setRefesh] = useState(true);
    const [selected, setSelected] = useState<string>("");
    const [parent, enableAnimations] = useAutoAnimate({duration:300});
    const isRefresh = () => {
        return refresh === true;
    }

    const getSprints = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/sprint/${projectID as string}`
            console.log("url")
            console.log(`url ${reqUrl}`);
            if (projectID != null) {
                const results = await axios.get(reqUrl)
                console.log(results.data.sprints)
                setSprints((prev): any => [...results.data.sprints])
            }
            setRefesh(false);
            //setSprints(results.data.sprints)
        } catch (error) {
            //we failed to get notes for some reason
            //  setSprints(null);
        }

    }

    const addSprint = (sprint: any) => {
        setSprints((prev) => [...prev, sprint]);

    }

    const changeSelected = (sprintID: string) => {
        setSelected(sprintID);
    }

    const removeSprint = (sprintID: string) => {
        const sprintList = sprints.filter((sprint) => sprint.id !== sprintID);
        if (sprintList) {
            setSprints(sprintList);
        }

    }

    const deleteSprint = async () => {
        try {

            const responseSprint = await axios.delete(`${config.backendApiUrl}/projects/sprint/${selected}`);
            const sprint = responseSprint.data.sprint;
            // add(responseSprint.data.sprint)
            removeSprint(selected)
            return responseSprint.data.sprint;
            //refresh(true)
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(
        () => {
            if (projectID != null && refresh) {

                getSprints();

            }


        }, [sprints, projectID]

    )
    return (
        <div>
            <Head>
                <title>Milestones | Dev Diaries</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main className="container mx-auto">
                {projectID != null ? (<BackPage link={`/project/${projectID as string}`} name={`Back to  Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}

                <div ref={parent}>
                    <MilestoneHero sprints={sprints} changeSelected={changeSelected} animate={parent} />
                </div>
            </main>
            <SprintModal projectID={projectID as string} add={addSprint} />
            <SprintDelete deleteSprint={deleteSprint} />
        </div>
    )
}