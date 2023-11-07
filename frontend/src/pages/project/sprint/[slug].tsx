import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "~/components/navbar";
import SprintModal from "~/components/sprintmdl";
import useSprint from "~/hooks/use_sprint";
import useUser from "~/hooks/use_user";

function Form({ projectID }: { projectID: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();




    const submitSprint = async (data: any) => {
        const startDate = new Date(data.start);
        const deadlineDate = new Date(data.deadline);
        const responseSprint = await axios.post('http://localhost:5001/projects/sprint', {
            sprintID: null,
            projectID: projectID,
            name: data.name,
            start: startDate.toISOString(),
            deadline: deadlineDate.toISOString(),
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        try {
            const startDate = new Date(data.start);
            const deadlineDate = new Date(data.deadline);
            const responseSprint = await axios.post('http://localhost:5001/projects/sprint', {
                sprintID: null,
                projectID: projectID,
                name: data.name,
                start: startDate.toISOString(),
                deadline: deadlineDate.toISOString(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(responseSprint.data)
            const modalElement: any = document.getElementById('sprint_modal')
            modalElement.close()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className="flex flex-col" onSubmit={handleSubmit(submitSprint)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
            </div>




            <div className="form-control">
                <label className="label">
                    <span className="label-text">start</span>
                </label>
                <input {...register("start")} type="date" placeholder="Start" className="input input-bordered" required />

            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">deadline</span>
                </label>
                <input {...register("deadline")} type="date" placeholder="Name" className="input input-bordered" required />

            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary">Add Sprint</button>
            </div>
        </form>
    )
}

function Sprints() {

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl text-center uppercase mb-2 ">Sprints</h1>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" checked={true} />
                <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
        </div>
    )
}

function MilestoneHero() {
    return (
        <div className="flex flex-row justify-evenly ">
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
            <Sprints />
        </div>
    )
}

export default function SprintPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [sprints, setID] = useSprint();
    const projectID: string | string[] | null | undefined = router.query.slug;

    useEffect(
    ()=>{
        if (projectID != null && setID && projectID != undefined  )  {
           // const results = await getProjectData(projectID);
           // if (results && setID != null) {
                setID(String(projectID))
               // setProjectData(results);
               // setGithub(results.github);

            }
    },[projectID,setID,user]
        
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
                    <MilestoneHero />
                </div>
            </main>
            <SprintModal projectID="" />
        </div>
    )
}