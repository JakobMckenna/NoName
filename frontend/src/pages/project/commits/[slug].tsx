/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";

import Spinner from "~/components/spinner";
import useCommits from "~/hooks/use_commits";
import useUser from "~/hooks/use_user";

import config from "config";
import BackPage from "~/components/back_navigation";
import Drawer from "~/components/drawer";

function CommitsList({ commits }: any) {
    return (
        <table className="table table-zebra max-w-lg">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Message</th>
                    <th>User</th>
                    <th>Commit</th>
                </tr>
            </thead>
            <tbody>

                {
                    commits.map(
                        (commit: any) => {
                            let commitData = commit.commit;
                            return (
                                <tr key={commit.sha} className="">
                                    <td>{commitData.author.date}</td>
                                    <td className="mr-2 max-w-xs">{commitData.message}</td>
                                    <td>{commitData.author.name}</td>
                                    <td>
                                        <a className="btn btn-link " href={commit.html_url}>see commit</a>
                                    </td>
                                </tr>
                            )
                        }
                    )
                }
            </tbody>
        </table>
    )
}

export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState<any>();
    const [github, setGithub] = useState(null);
    const [commits, latestCommits, setMaintainer, setProject] = useCommits();
    const projectID: string = String(router.query.slug);

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
            //setGithub()
            router.push("/home")
        }

    }

    useEffect(
        () => {

            if (user != null) {
                // console.log
                const getData = async () => {
                    if (projectID) {
                        const results = await getProjectData(projectID);
                        if (results && setMaintainer && setProject) {
                            setProjectData(results);
                            setGithub(results.github);

                            setMaintainer(String(results.github.owner))
                            setProject(results.github.repoName)
                        }

                    }
                }

                getData();



            }


        }, [projectID, user]
    )

    return (
        <div>
            <Drawer  userName={user!=null && (user.name!=undefined || user.name!=null)?`${user.name}#${user.id}`:""}>
                <main className="container w-full">
                    <div className="flex flex-col justify-center items-center pl-24 ">
                        {projectData != null ? (<BackPage link={`/project/${projectID}`} name={`Back to ${projectData?.name} Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                        <h1 className="text-4xl uppercase mb-3">{projectData != null ? `${projectData?.name} PROJECT Commits` : (<div className="skeleton h-10 w-80"></div>)} </h1>
                        {!commits && (<Spinner />)}
                        {commits != null && (<CommitsList commits={commits} />)}
                    </div>
                </main>
            </Drawer>

        </div>
    )

}