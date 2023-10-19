import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import RepoModal from "~/components/repomdl";
import useCommits from "~/hooks/use_commits";
import useUser from "~/hooks/use_user";


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
                                    <td>{commit.html_url}</td>
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
    const [projectData, setProjectData] = useState();
    const [github, setGithub] = useState(null);
    const [commits, latestCommits, setMaintainer, setProject] = useCommits();
    const projectID: string = String(router.query.slug);

    const getProjectData = async (id: string) => {
        const reqUrl = `http://localhost:5000/projects/${id}`
        const results = await axios.get(reqUrl)
        console.log(results.data.projects)
        return results.data.projects

    }

    useEffect(
        () => {

            if (user) {
                // console.log
                const getData = async () => {
                    if (projectID) {
                        const results = await getProjectData(projectID);
                        setProjectData(results);
                        setGithub(results.github);
                        if (github) {
                            setMaintainer(String(results.github.owner))
                            setProject(results.github.repoName)
                        }

                    }
                }

                getData();



            }


        }, [loading, user,getProjectData(projectID)]
    )

    return (
        <div>
            <Navbar userName={user?.email} />

            <main className="container ml-80 pl-10">
                <h1 className="text-4xl uppercase mb-3">{projectData?.name} PROJECT Commits</h1>
                {commits != null && (<CommitsList commits={commits} />)}
            </main>

        </div>
    )

}