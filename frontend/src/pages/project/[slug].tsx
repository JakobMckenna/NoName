import useUser from "~/hooks/use_user"
import { useRouter } from 'next/router'
import Navbar from "~/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import RepoModal from "~/components/repomdl";
import Link from "next/link";

function MenuCard({ github, projectID }: { github: any, projectID: string }) {
    console.log(github);
    return (
        <div className="card  glass w-96  shadow-xl mr-12 max-h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Github</h2>
                <div>
                    <Link href={`/project/commits/${projectID}`} className="btn btn-link">see commits</Link>
                </div>
                {!github && (
                    <div className="card-actions justify-start">
                        <button onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-secondary  btn-link">setup github</button>
                    </div>)
                }
            </div>

        </div>
    )
}

function ResearchCard({ projectID }: { projectID: string }) {
    // console.log(github);
    return (
        <div className="card  glass w-96  shadow-xl mr-12 max-h-56 ">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research</h2>
                <div>
                    <Link href={`/project/commits/${projectID}`} className="btn btn-link">See Bookmarks</Link>
                </div>

            </div>

        </div>
    )
}


export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState()
    const [github, setGithub] = useState(null)
    const projectID: string = String(router.query.slug);

    const getProjectData = async (id: string) => {
        const reqUrl = `http://localhost:5000/projects/${id}`
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
                        if (results) {
                            setProjectData(results);
                            setGithub(results.github);
                        }
                    }
                }

                getData();



            }


        }
    )

    return (
        <div>
            <Navbar userName={user?.email} />

            <main className="container ml-80 pl-10">
                <h1 className="text-4xl uppercase mb-3">{projectData?.name} PROJECT</h1>
                <div className="flex flex-row">
                    <MenuCard github={github} projectID={projectID} />
                    <ResearchCard projectID={projectID} />
                </div>
                
            </main>
            <RepoModal projectID={projectID} />
        </div>
    )

}