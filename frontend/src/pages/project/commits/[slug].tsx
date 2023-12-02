/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import _ from "lodash";
import Spinner from "~/components/spinner";
import useCommits from "~/hooks/use_commits";
import useUser from "~/hooks/use_user";

import config from "config";
import BackPage from "~/components/back_navigation";
import Drawer from "~/components/drawer";
import Iframe from "react-iframe";
import Head from "next/head";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";


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
                            const author = commitData.author;
                            console.log(commitData)
                            return (
                                <div key={commit.sha} className="flex flex-row bg-secondary-content  justify-center w-full mb-5">
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
    const [parent, enableAnimations] = useAutoAnimate({ duration: 300 })
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
            <tbody ref={parent}>

                {
                    commits.map(
                        (commit: any) => {
                            let commitData = commit.commit;
                            const date = new Date(commitData.author.date);
                            return (
                                <tr key={commit.sha} className="">
                                    <td>{date.toLocaleDateString()}</td>
                                    <td className="mr-2 max-w-xs">{commitData.message}</td>
                                    <td>{commit.author.login}</td>
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
    const [filteredCommits, setFilteredCommits] = useState<any | null | []>()
    const [message, setMessage] = useState<string>("")
    const [sort, setSort] = useState("0")

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

    const search = () => {
        if (commits && Array.isArray(commits)) {
            const list = commits?.filter((commit: any) => {
                return commit.commit.message.toLowerCase().includes(message?.toLowerCase())
            })
            // console.log(list)
            setFilteredCommits(list)
        }
    }

    const sortCommits = () => {
        if (commits && Array.isArray(commits) && sort == "0") {
           const list=  _.sortBy(filteredCommits,(commit)=>
               -  new Date(commit.commit.author.date).getTime()
            )
           // console.log(list)
            setFilteredCommits(list)
        } else if (commits && Array.isArray(commits) && sort == "1") {
            console.log("oldest")
            const list = _.sortBy(filteredCommits,(commit)=>  - new Date(commit.commit.author.date).getTime()
            )
            //console.log(list)
            const result = _.reverse(list)
            
            setFilteredCommits(result);
        }
    }

    useEffect(
        () => {

            if (user != null && !commits) {
                // console.log
                const getData = async () => {
                    if (projectID && !Array.isArray(setMaintainer) && !Array.isArray(setProject)) {
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

            if (commits && Array.isArray(commits) && !filteredCommits) {
                const uniqueNames = _.uniq((commits).map(commit=>commit.author.login));
                console.log(uniqueNames)
                setFilteredCommits(commits)
            }




        }, [projectID, user, commits, filteredCommits]
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
                        <div className="flex flex-row justify-between items-start py-3 px-5 mb-5">
                            <div className="flex flex-row w-1/2 mr-5">
                                <input
                                    type="text"
                                    placeholder="Message"
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={
                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                            const userInput = event.target.value;
                                            if (userInput == "") {
                                                setFilteredCommits(commits);
                                            }
                                            setMessage(userInput)

                                        }
                                    }
                                />
                                <button
                                    className="btn  btn-md"
                                    onClick={() => search()}
                                >
                                    Search
                                </button>
                            </div>
                            {/*  Sort options     */}
                            <div className="flex flex-row w-1/2">
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    onChange={
                                        (event: React.ChangeEvent<HTMLSelectElement>) => {
                                            const userInput = event.target.value;
                                            
                                            // setMessage(userInput)
                                            setSort(userInput)

                                        }
                                    }
                                >
                                    <option disabled selected>Order</option>
                                    <option value={"0"}>Newest</option>
                                    <option value={"1"}>Oldest</option>
                                </select>

                                <button
                                    className="btn  btn-md mr-5"
                                    onClick={
                                        ()=>sortCommits()
                                    }
                                >
                                    Sort
                                </button>
                            </div>




                        </div>
                    </div>



                </main>
                <div className=" flex flex-row justify-center items-center w-full">
                    {!filteredCommits && (<Spinner />)}
                    {filteredCommits != null && (<CommitsTable commits={filteredCommits} />)}
                </div>

            </Drawer>

        </div>
    )

}