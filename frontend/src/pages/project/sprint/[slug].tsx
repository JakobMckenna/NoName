import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "~/components/navbar";
import SprintModal from "~/components/sprintmdl";
import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";



function Sprints({ sprints }: any) {
    // console.log(sprints)
    const convDate = (date: string) => {
        const result = new Date(date)
        return result.toLocaleDateString();
    }
    return (
        <div className="flex flex-col">

            <h1 className="text-2xl text-center uppercase mb-2 ">Sprints</h1>
            {
                sprints && sprints.map(

                    (sprint: any) => {
                        const start = convDate(sprint.start)
                        const end = convDate(sprint.deadline)
                        return (<div key={sprint.id} className="collapse collapse-arrow w-80 bg-base-200">
                            <input type="radio" name="my-accordion-2"  />
                            <div className="collapse-title text-xl font-medium">
                                {sprint.name}
                            </div>
                            <div className="collapse-content">
                                <div className="flex flex-row justify-between">
                                    <p>start: {start}</p>
                                    <p>end: {end}</p>
                                </div>
                            </div>
                        </div>)
                    })
            }
        </div>
    )
}

function MilestoneHero({ sprints }: any) {
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
            <Sprints sprints={sprints} />
        </div>
    )
}

export default function SprintPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [sprints, setID] = useSprint();
    const projectID: string | string[] | null | undefined = router.query.slug;
    const [refresh ,setRefesh] = useState(true)
    const isRefresh =()=>{
        return refresh === true;
    }

    useEffect(
        () => {
            if (refresh && projectID != null && setID && projectID != undefined ) {
                // const results = await getProjectData(projectID);
                // if (results && setID != null) {
                setID(String(projectID))
                // setProjectData(results);
                // setGithub(results.github);

            }

            if(sprints && setID){
                console.log("is refreshing")
                // setProjectData(results);
                setID(String(projectID))
                setRefesh(false)
            }
        }, [isRefresh, refresh]

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
                <div >
                    <MilestoneHero sprints={sprints} />
                </div>
            </main>
            <SprintModal projectID={String(projectID)}  refresh={(val:boolean)=>setRefesh(val)}/>
        </div>
    )
}