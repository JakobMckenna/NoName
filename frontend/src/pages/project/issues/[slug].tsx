import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import Navbar from "~/components/navbar";
import Spinner from "~/components/spinner";
import useUser from "~/hooks/use_user";
import * as _ from 'lodash';


interface Label {

    id: number;
    node_id: string
    url: string
    name: string
    color: string
    default: string
    description: string

}

function Issue({ title, label, assigned, milestone, dueDate, avatar, clickLabel, clickMilestone }: { title: string, label: Label[], assigned: string, milestone: string, dueDate: string, avatar: string, clickLabel: Function, clickMilestone: Function }) {
    const convDate = (date: string) => {
        const result = new Date(date)
        return ` ${result.toDateString()}`

    }
    const date = convDate(dueDate)
    return (
        <div className="flex flex-row justify-between py-2 border-b-2  mb-5">
            <p className="w-36">{title}</p>
            <div className="flex flex-col w-32">
                {
                    label.map(
                        (data, index) => {

                            return (
                                <button
                                    key={index}
                                    className="badge hover:badge-secondary"
                                    onClick={
                                        () => clickLabel(data.name)
                                    }
                                >
                                    {data.name}
                                </button>
                            )
                        }
                    )
                }
            </div>
            <div className=" w-32"> {assigned && (<><Image src={avatar} height={20} width={20} alt={""} /><p>{assigned}</p> </>)}</div>
            <div className="w-32 ">
                <button
                    className="badge badge-secondary badge-outline"
                    onClick={
                        () => clickMilestone(milestone)
                    }
                >
                    {milestone}
                </button>
            </div>
            <p className="w-32">{date}</p>
        </div>
    )
}

function Issues({ issues, type, clickLabel, clickMilestone }: any) {
    

    return (
        <>

            {

                issues && issues.map(
                    (issue: any, index: number) => {
                        const name = issue.assignee?.login
                        const milestone = issue.milestone?.title
                        const dueOn = issue.milestone?.due_on
                        const labels = issue.labels
                        const avatar = issue.assignee?.avatar_url
                        // setLabels((list:any)=>[...list,labels])

                        return (
                            <Issue key={index}
                                title={issue.title}
                                label={labels}
                                assigned={name}
                                milestone={milestone}
                                dueDate={dueOn}
                                avatar={avatar}
                                clickLabel={clickLabel}
                                clickMilestone={clickMilestone}
                            />
                        )
                    }
                )

            }

            {
                issues.length == 0 && (<div>No issues {type} yet</div>)
            }
        </>
    )

}



function IssueList({ openIssues, closedIssues, refresh }: any) {
    const [show, setShow] = useState(true);
    const labelTxt = useRef<HTMLInputElement>(null);
    const milestoneTxt = useRef<HTMLInputElement>(null)
    const [filteredOpen, setFilteredOpen] = useState<any[]>(openIssues)
    const [filteredClosed, setFilteredClosed] = useState<any[]>(closedIssues)


    const searchLabel = (issues: any[], search: string) => {
        setFilteredOpen(openIssues);
        setFilteredClosed(closedIssues);
        return _.filter(issues, (issue) => {
            return _.some(issue.labels, (label) => label.name.toLowerCase().includes(search.toLowerCase()))
        })

    }

    const searchMilestone = (issues: any[], search: string) => {
        return _.filter(issues, (issue) => {
            return issue.milestone.title.toLowerCase().includes(search.toLowerCase())
        })

    }

    const handleLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
        const label = event.target.value;
        let list;

        //console.log(label)
        if (show) {
            list = searchLabel(openIssues, label)
            setFilteredOpen(list)
            //console.log(list)
        } else {
            list = searchLabel(closedIssues, label)
            setFilteredClosed(list)
        }

    }

    const handleMilestone = (event: React.ChangeEvent<HTMLInputElement>) => {
        const milestone = event.target.value;
        let list;

        if (show) {
            list = searchMilestone(openIssues, milestone);
            setFilteredOpen(list);
        } else {
            list = searchMilestone(closedIssues, milestone);
            setFilteredClosed(list);
        }



    }

    const clickLabel = (label: string) => {
        let list;
        if (labelTxt && labelTxt.current) {
            labelTxt.current.value = label
            //  labelTxt.current.
        }

        if (show) {
            list = searchLabel(openIssues, label)
            setFilteredOpen(list)
            //console.log(list)
        } else {
            list = searchLabel(closedIssues, label)
            setFilteredClosed(list)
        }

        //   handleLabel()
    }

    const clickMilestone = (milestone: string) => {
        let list;
        if (milestoneTxt && milestoneTxt.current) {
            milestoneTxt.current.value = milestone
            //  labelTxt.current.
        }

        if (show) {
            list = searchMilestone(openIssues, milestone);
            setFilteredOpen(list);
            //console.log(list)
        } else {
            list = searchMilestone(closedIssues, milestone);
            setFilteredClosed(list);
        }

    }


    return (
        <div className="flex flex-col  border bg-neutral border-rose-400 p-10 w-max justify-center  mb-10  ">
            <div className="flex flex-row justify-between w-100 mb-5">
                <button
                    className="btn btn-info"
                    onClick={
                        () => {
                            refresh(true);
                            setShow(true);
                        }
                    }>Open Issues</button>
                <button
                    className="btn btn-warning"
                    onClick={
                        () => {
                            refresh(true);
                            setShow(false);

                        }
                    }>Recently Closed Issues
                </button>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-between w-10/12">
                    <input
                        ref={labelTxt}
                        type="text"
                        placeholder="Label"
                        className="input input-bordered w-1/3 max-w-xs"
                        onChange={handleLabel}
                    />

                    <input
                        ref={milestoneTxt}
                        type="text"
                        placeholder="Milestone"
                        className="input input-bordered w-1/3 max-w-xs"
                        onChange={handleMilestone}
                    />

                </div>
            </div>
            <div className="h-80 overflow-y-auto">

                {
                    show ? <Issues issues={filteredOpen} type={""} clickLabel={(val: string) => clickLabel(val)} clickMilestone={(val: string) => clickMilestone(val)} /> : <Issues issues={filteredClosed} type={"recently closed"} clickLabel={(val: string) => clickLabel(val)} clickMilestone={(val: string) => clickMilestone(val)} />
                }


            </div>

        </div>
    )
}



export default function IssuesPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [refresh, setRefresh] = useState(true);
    const projectID: string | string[] | null | undefined = router.query.slug;
    const [openIssues, setOpenIssues] = useState();
    const [closedIssues, setClosedIssues] = useState();

    const getIssues = async (owner: string, repo: string) => {
        let result = true;
        const reqUrlOpen = `http://localhost:5001/github/issues/${owner}/${repo}`
        const reqUrlClosed = `http://localhost:5001/github/closedissues/${owner}/${repo}`
        try {

            const resultsOpen = await axios.get(reqUrlOpen);
            const resultsClosed = await axios.get(reqUrlClosed);
            //setRefresh(false);
            console.log(resultsClosed.data);
            setOpenIssues(resultsOpen.data.issues)
            setClosedIssues(resultsClosed.data.issues)

        } catch (error) {
            //setGithub()
            result = false;
            //
        } finally {
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
            <main className="container mx-auto ">
                <h1 className="text-4xl uppercase mb-2 text-center">Issues</h1>
                <div className="flex flex-row justify-center ">
                    {!openIssues && (<Spinner />)}
                    {openIssues && <IssueList openIssues={openIssues} closedIssues={closedIssues} refresh={(val: boolean) => setRefresh(val)} />}
                </div>
            </main>
        </div>
    )
}