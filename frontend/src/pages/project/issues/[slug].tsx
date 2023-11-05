import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbar";
import useUser from "~/hooks/use_user";

function IssueList(){
    return(
        <div className="flex flex-col w-96">
            <div className="flex flex-row justify-between w-100">
                <button className="btn">Open Issues</button>
                <button className="btn">Recently Closed Issues</button>
            </div>

        </div>
    )
}



export default function IssuesPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [refresh, setRefresh] = useState(true)
    const [projectData, setProjectData] = useState<any>();
    const projectID: string | string[] | null | undefined = router.query.slug;
    const [openIssues ,setOpenIssues] = useState()
    const getIssues = async (owner: string, repo: string) => {
        let result = true;
        const reqUrlOpen = `http://localhost:5001/github/issues/${owner}/${repo}`
        const reqUrlClosed = `http://localhost:5001/github/closedissues/${owner}/${repo}`
        try {
           
            const resultsOpen = await axios.get(reqUrlOpen);
            const resultsClosed =  await axios.get(reqUrlClosed);
            //setRefresh(false);
            console.log(resultsClosed.data);
            setOpenIssues(resultsOpen.data.issues)
           

        } catch (error) {
            //setGithub()
            result = false;
            //
        }finally{
            return result
        }
    }

    const getProjectData = async (id: string) => {
        const reqUrl = `http://localhost:5001/projects/${id}`
        try {
            if (!id) {
                router.push("/")
            }
            const results = await axios.get(reqUrl);
            setRefresh(false);
            //  console.log(results.data.projects)
            return results.data.projects

        } catch (error) {
            //setGithub()
            // router.push("/home")
        }

    }
    const isRefreshing = () => {
        return refresh === true;
    }

    useEffect(
        () => {

            if (user != null) {
                // console.log
                const getData = async () => {
                    if (projectID != null) {
                        const results = await getProjectData(String(projectID));
                        if (results) {
                            //  setProjectData(results);
                            // setGithub(results.github);

                            const owner = results.github.owner
                            const repo = results.github.repoName
                            getIssues(owner, repo)
                        }

                    }
                }
                if (refresh) {
                    getData();

                }



            }


        }, [isRefreshing]
    )

    return (
        <div>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main className="container mx-auto">
                    <h1 className="text-center">Github Issues</h1>
                    <IssueList />
            </main>
        </div>
    )
}