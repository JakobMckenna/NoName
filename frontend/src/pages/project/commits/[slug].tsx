/* eslint-disable */
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import _ from "lodash";
import Spinner from "~/components/spinner";
import useCommits from "~/hooks/use_commits";
import useUser from "~/hooks/use_user";
import config from "config";
import BackPage from "~/components/back_navigation";
import Drawer from "~/components/drawer";
import Head from "next/head";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";



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
                            const commitData = commit.commit;
                            const date = new Date(commitData.author.date);
                            return (
                                <tr key={commit.sha} className="">
                                    <td>{date.toLocaleDateString()}</td>
                                    <td className="mr-2 max-w-xs">{commitData.message}</td>
                                    <td className="flex flex-col ">
                                        <Image
                                            src={commit.author.avatar_url}
                                            width={25}
                                            height={25}
                                            alt=""
                                            objectFit="cover"
                                        />
                                        <div>{commit.author.login}</div>
                                    </td>
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


function UserSort({ users, changeName }: { readonly users: any[], readonly changeName: any }) {

    return (
        <div className="flex flex-row justify-start w-1/3 mb-5 mr-5 ">
            <select
                className="select select-bordered w-full max-w-xs"
                onChange={
                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                        const userInput = event.target.value;
                        changeName(userInput)

                        // setMessage(userInput)
                        //  setSort(userInput)

                    }
                }
            >
                <option value={""}>All Users</option>

                {
                    users?.map((user) => {
                        return (<option key={user} value={user}>{user}</option>)
                    })
                }
            </select>


        </div>

    )
}

function MessageSort({ setMessage }: {readonly setMessage: any }) {
    return (
        <div className="flex flex-row w-1/2 mr-5">
            <input
                type="text"
                placeholder="Message"
                className="input input-bordered w-full max-w-xs"
                onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                        const userInput = event.target.value;

                        setMessage(userInput)

                    }
                }
            />

        </div>
    )
}


function GithubLink({ github }: { readonly github: any }) {
    return (
        <a
            href={`https://github.com/${github?.owner ? github?.owner : ""}/${github?.repoName}`}
            target="_blank"
            className="ml-1 underline decoration-sky-500 tooltip"
            data-tip="Link to repo on github"
        >
            {github?.repoName}
        </a>

    )
}


export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData, setProjectData] = useState<any>();
    const [github, setGithub] = useState<any>(null);
    const [commits, latestCommits, setMaintainer, setProject] = useCommits();
    const projectID = router.query.slug;
    const [filteredCommits, setFilteredCommits] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const [users, setUsers] = useState<any[]>([]);
    const [sort, setSort] = useState("0");
    const [name, setName] = useState("");

    /**
     * getProjectData
     * get project data from backend by project ID
     * @param id 
     * @returns  
     */
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

    /**
     * search
     * set state of commits by name of github contributer and message text
     */
    const search = () => {
        if (commits && Array.isArray(commits)) {
            if (name != "") {
                const list = commits?.filter((commit: any) => {
                    return commit.commit.message.toLowerCase().includes(message?.toLowerCase()) && commit.author.login.includes(name)
                })
                // console.log(list)
                setFilteredCommits(list)
            } else {
                const list = commits?.filter((commit: any) => {
                    return commit.commit.message.toLowerCase().includes(message?.toLowerCase())
                })
                // console.log(list)
                setFilteredCommits(list)
            }
        }
    }

    /**
     * sortCommits 
     * sorts commits by date and sets state
     */
    const sortCommits = () => {
        if (commits && Array.isArray(commits) && sort == "0") {
            const list = _.sortBy(filteredCommits, (commit) =>
                -  new Date(commit.commit.author.date).getTime()
            )
            // console.log(list)
            setFilteredCommits(list)
        } else if (commits && Array.isArray(commits) && sort == "1") {
            console.log("oldest")
            const list = _.sortBy(filteredCommits, (commit) => - new Date(commit.commit.author.date).getTime()
            )
            //console.log(list)
            const result = _.reverse(list)

            setFilteredCommits(result);
        }
    }



    useEffect(
        () => {

            // waits for user data to load 
            // this only gets commits if commits is empty or if page refreshes
            if (user != null && !commits) {

                /**
                 * getData
                 * retieve project data from backend  and set state of page
                 */
                const getData = async () => {
                    if (projectID && !Array.isArray(setMaintainer) && !Array.isArray(setProject)) {
                        const results = await getProjectData(projectID as string);
                        if (results && setMaintainer && setProject) {
                            setProjectData(results);
                            setGithub(results.github);
                            setMaintainer(String(results.github.owner));
                            setProject(results.github.repoName);
                        }

                    }
                }


                // gets project data and sets state
                getData();


            }

            // gets all contributers of the past 100 commits of github project
            if (commits && Array.isArray(commits) && !filteredCommits) {
                const users = _.uniq((commits).map(commit => commit.author.login));
                setUsers(users);
                setFilteredCommits(commits);
            }




        }, [projectID, user, commits, filteredCommits]
    )

    return (
        <div>
            <Head>
                <title>Commits | Dev Diaries</title>
            </Head>
            <Drawer userName={user != null && (user.name != undefined || user.name != null) ? `${user.name}#${user.id}` : ""}>
                <main className="container ">
                    <div className="flex flex-col justify-center items-center ">
                        {projectData != null ? (<BackPage link={`/project/${projectID}`} name={`Back to ${projectData?.name} Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                        <h1 className="prose text-4xl font-bold uppercase mb-3">{projectData != null ? `${projectData?.name} PROJECT Commits` : (<div className="skeleton h-10 w-80"></div>)} </h1>
                        <p className="prose text-2xl mb-3">Latest commits from <GithubLink github={github} /> Repo</p>

                        {/*  Sort options     */}
                        <div className="flex flex-row w-1/2 justify-end pr-12 mr-8 ">
                            <select
                                className="select select-bordered w-1/6  max-w-xs"
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        const userInput = event.target.value;
                                        setSort(userInput);
                                    }
                                }
                            >
                                <option value={"0"}>Newest</option>
                                <option value={"1"}>Oldest</option>
                            </select>

                            <button
                                className="btn  btn-md mr-5"
                                onClick={
                                    () => sortCommits()
                                }
                            >
                                Sort
                            </button>
                        </div>
                        <div className="flex flex-row justify-between items-start py-3 px-5 mb-5">
                            <UserSort
                                users={users}
                                changeName={(val: string) => setName(val)}
                            />
                            <MessageSort
                                setMessage={(val: string) => setMessage(val)}
                            />
                            <button
                                className="btn"
                                onClick={() => search()}
                            >
                                filter
                            </button>
                        </div>


                    </div>



                </main>
                <div className=" flex flex-col justify-center items-center w-full">
                    {!filteredCommits && (<Spinner />)}
                    <p className="prose font-bold  w-1/2 pl-10 mb-1">{filteredCommits?.length} Commits from Main Branch</p>
                    {filteredCommits != null && (<CommitsTable commits={filteredCommits} />)}
                </div>

            </Drawer>

        </div>
    )

}