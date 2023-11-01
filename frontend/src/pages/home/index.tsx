/* eslint-disable */

import axios from "axios";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


import Navbar from "~/components/navbar";
import ProjectModal from "~/components/projectmdl";

import useUser from "~/hooks/use_user";

function RepoCard({ projects }: any) {
    console.log(projects)
    return (
        <div className="card glass w-96  shadow-xl mr-12 max-h-64 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Projects</h2>
                <ul>
                    {
                        projects.map(
                            (project: any) => {
                                return (
                                    <li key ={project.project.id}>
                                      <Link href={`/project/${project.project.id}`} className="btn   btn-link"> {project.project.name} </Link>
                                    </li>
                                )
                            }
                        )

                    }
                </ul>
                <div className="card-actions justify-start">
                    <button className="btn btn-secondary  btn-link" onClick={() => {
                       const modalElement:any= document.getElementById('my_modal_3')
                       if(modalElement){
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
        <div className="card glass w-96  shadow-xl mr-12 max-h-64 m-4">

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
        <div className="card glass w-96  shadow-xl mr-12 max-h-64 m-4">

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
        <div className="card  glass w-96  shadow-xl mr-12 max-h-56 m-4">

            <div className="card-body items-center text-center h-full">
                <h2 className="card-title">Research Links</h2>
                <ul>

                </ul>
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
    const [refresh,setRefresh] = useState(true)

    const getProjects = async (userID: number) => {
        const reqUrl = `http://localhost:5001/users/projects/${userID}`
        const results = await axios.get(reqUrl)
        console.log(results.data.user)
       
        return results.data.user

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
                if(refresh)
                {
                    projects()
                    setRefresh(false)
                }
               
            }


        }
    )
    return (
        <div className = "w-full mx-auto">
            <Head>
                <title>DevDiaries | user</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar userName={user?.email} />
            <main className="container flex flex-wrap justify-center items-center mx-auto">
                <div className="flex flex-row mb-10 items-center">
                    <RepoCard projects={projectList} />
                    <TaskCard />
                </div>
                <div className="flex flex-row items-center">
                    <StatsCard />
                    <MenuCard />
                </div>
            </main>
            <ProjectModal userID={user?.id} refresh={(val:boolean)=>setRefresh(val)} />
        </div>
    )
} 
