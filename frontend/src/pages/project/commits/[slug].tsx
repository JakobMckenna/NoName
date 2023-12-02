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
import Iframe from "react-iframe";
import Head from "next/head";
import Image from "next/image";


function Commit({ time, message, author, commit }: { time: string, message: string, author: string, commit: string }) {
    const date = new Date(time)
    return (
        <div className="flex flex-row prose text-white    justify-evenly items-center py-3 w-full  ">
            <div className="flex flex-row w-1/5 justify-center">
                <p>{date.toDateString()}</p>
            </div>
            <div className="flex flex-row w-1/5  justify-start text-ellipsis overflow-hidden ... prose">
                <p>{message}</p>
            </div>
            <div className="flex flex-row w-1/5 justify-center">
                <p>{author}</p>
            </div>
            <div className="flex flex-row w-1/5 justify-center">
                <a role="button" className="btn btn-link " href={commit}>see commit</a>
            </div>
        </div>
    )
}

function CommitsList({ commits }: any) {
    if (commits) {
        return (
            <div className=" flex flex-col justify-center bg-base-300    w-full ">
                {
                    commits.map(
                        (commit: any) => {
                            let commitData = commit.commit;
                            const author =commitData.author;
                            console.log(commitData)
                            return (
                                <div  key={commit.sha} className="flex flex-row bg-secondary-content  justify-center w-full mb-5">
                                    <Commit
                                        time={commitData.author.date}
                                        message={commitData.message}
                                        author={commitData.author.name}
                                        commit={commit.html_url}
                                        
                                    />
                                </div>
                            )
                        }
                    )
                }

            </div>
        )
    }
    else {
        return (
            <div className="flex flex-row w-full justify-center ">
                <div>
                    <Spinner />
                </div>
            </div>
        )
    }
}

function CommitsTable({ commits }: any) {
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

                                        <a role="button" className="btn btn-link " href={commit.html_url}>see commit</a>

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
    const projectID = router.query.slug;

    const getProjectData = async (id: string) => {
        const reqUrl = `${config.backendApiUrl}/projects/${id}`
        try {

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
                        const results = await getProjectData(projectID as string);
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
            <Head>
                <title>Commits</title>
            </Head>
            <Drawer userName={user != null && (user.name != undefined || user.name != null) ? `${user.name}#${user.id}` : ""}>
                <main className="container ">
                    <div className="flex flex-col justify-center items-center ">
                        {projectData != null ? (<BackPage link={`/project/${projectID}`} name={`Back to ${projectData?.name} Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                        <h1 className="prose text-4xl font-bold uppercase mb-3">{projectData != null ? `${projectData?.name} PROJECT Commits` : (<div className="skeleton h-10 w-80"></div>)} </h1>

                    </div>


                </main>
                <div className=" flex flex-row justify-center items-center w-full">
                    {!commits && (<Spinner />)}
                    {commits != null && (<CommitsList commits={commits} />)}
                </div>

            </Drawer>

        </div>
    )

}