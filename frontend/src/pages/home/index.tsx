/* eslint-disable */

import axios from "axios";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


import Navbar from "~/components/navbar";
import ProjectModal from "~/components/projectmdl";

import useUser from "~/hooks/use_user";

import config from "config";

function RepoCard({ projects }: any) {
    //console.log(projects)
    return (
        <div className="card  glass w-80  shadow-xl mr-12 max-h-64 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Projects</h2>
                <ul>
                    {
                        projects.map(
                            (project: any, index: number) => {
                                return (
                                    <li key={project.project.id}>
                                        <Link href={`/project/${project.project.id}`} className="btn   btn-link"> {project.project.name} </Link>
                                    </li>
                                )
                            }
                        )

                    }
                </ul>
                <div className="card-actions justify-start">
                    <button className="btn btn-secondary  btn-link" onClick={() => {
                        const modalElement: any = document.getElementById('my_modal_3')
                        if (modalElement) {
                            modalElement?.showModal()
                        }

                    }
                    }>Add Project</button>
                </div>
            </div>
        </div>
    )
}

function TaskCard() {
    return (
        <div className="card bg-neutral-focus w-80  shadow-xl mr-12 max-h-64 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Tasks</h2>
                <ul>

                </ul>
                <div className="card-actions justify-start">
                    <button className="btn btn-secondary  btn-link">Add Task</button>
                </div>
            </div>
        </div>
    )
}

function StatsCard() {
    return (
        <div className="card bg-neutral-focus w-80  shadow-xl mr-12 max-h-64 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Statistics</h2>
                <ul>

                </ul>
            </div>
        </div>
    )
}

function MenuCard() {
    return (
        <div className="card  bg-neutral-focus w-80  shadow-xl mr-12 max-h-56 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research Links</h2>
                <ul>

                </ul>
            </div>
        </div>
    )
}

function Tile({id,name,user}:{id:string ,name:string,user:string}){
    return(
        <Link href={`/project/${id}`} className="card w-96 bg-primary glass text-primary-content shadow-xlw-full mb-2 hover:-translate-y-3 hover:-skew-y-3">
            <div className="card-body">
                <h2 className="card-title">{name} </h2>
                <p> Created by {user} </p>
            </div>

        </Link>
    )
}
function ProjectHero({projects}:{projects:any}) {
    return (
        <div className="hero  bg-base-100">
            <div className="hero-content ">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Your Projects</h1>
                    <p className="py-6">List of projects</p>
                    {
                        projects && projects.map(
                            (project: any, index: number) => {
                                const id = project.project.id;
                                const user =project.project.user?.name;
                                const projectName = project.project.name;
                                
                                return (
                                    
                                    <Tile id={id} name={projectName} user={user} />
                                )
                            }
                        )

                    }
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
    //const [loading ,setLoading] = useState(true)
    // const [user ,setUser] =useState<any>(null)
    const router = useRouter();
    const [user, loading] = useUser()
    const [projectList, setProjectList] = useState([])
    const [refresh, setRefresh] = useState(true)

    const getProjects = async (userID: number) => {
        const reqUrl = `${config.backendApiUrl}/users/projects/${userID}`
        const results = await axios.get(reqUrl)
        console.log(results.data.user)
        setRefresh(false);

        return results.data.user

    }

    const isRefresh = () => {
        return refresh == true
    }

    useEffect(
        () => {

            if (user) {
                const projects = async () => {
                    const results = await getProjects(user.id)
                    console.log("members")
                    console.log(results.member)
                    setProjectList(results.member);
                    console.log(`list ${projectList}`)

                    return results.project;
                }
                if (refresh) {
                    projects()
                    // setRefresh(false)
                }

            }


        }, [isRefresh]
    )
    return (
        <div className="w-full mx-auto">
            <Head>
                <title>DevDiaries | user</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main>
                <ProjectHero projects={projectList} />
            </main>
            <ProjectModal userID={user?.id} refresh={(val: boolean) => setRefresh(val)} />
        </div>
    )
} 
