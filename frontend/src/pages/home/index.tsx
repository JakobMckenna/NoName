/* eslint-disable */

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAutoAnimate } from '@formkit/auto-animate/react'

import Navbar from "~/components/navbar";
import ProjectModal from "~/components/projectmdl";

import useUser from "~/hooks/use_user";

import config from "config";
import useCurrentTheme from "~/hooks/use_current_theme";
import { Ref } from "react-hook-form";

function LoadingTile() {
    return (
        <div className="card skeleton w-96 bg-primary glass text-primary-content shadow-xlw-full mb-10">
            <div className="card-body">
                <h2 className="skeleton h-4 w-28"> </h2>
                <p className="skeleton h-4 w-28"></p>
            </div>

        </div>
    )
}

function Tile({ id, name, user, parent }: { id: string, name: string, user: string, parent: any }) {
    return (
        <Link ref={parent} href={`/project/${id}`} className="card w-96 bg-primary glass text-primary-content shadow-xlw-full mb-10 hover:-translate-y-3 hover:-skew-y-3 duration-75">
            <div className="card-body">
                <h2 className="card-title">{name} </h2>
                <p> Created by {user} </p>
            </div>

        </Link>
    )
}

function ProjectHero({ projects, parent ,search }: { projects: any, parent: Ref,search:Function }) {
   // console.log(projects)

    return (
        <div className="hero  bg-base-100">
            <div className="hero-content ">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Dev Diaries</h1>
                    <div className="flex flex-col  items-start mb-5">
                        <button
                            className="btn btn-primary my-6 "
                            onClick={
                                () => {
                                    const modalElement: any = document.getElementById('my_modal_3')
                                    if (modalElement) {
                                        modalElement?.showModal()
                                    }
                                }
                            }
                        >Add Project</button>
                        <input
                            type="text"
                            placeholder="Find Project"
                            className="input input-bordered w-full max-w-xs"
                            onChange={
                                (event:React.ChangeEvent<HTMLInputElement>)=>{
                                    search(event.target.value)
                                }
                            }
                        />
                    </div>
                    {
                        projects.length > 0 ? projects.map(
                            (project: any, index: number) => {
                                const id = project.project.id;
                                const user = project.project.user?.name;
                                const projectName = project.project.name;
                                return (

                                    <Tile key={id} parent={parent} id={id} name={projectName} user={user} />
                                )
                            }
                        ) : (
                            <>
                                <LoadingTile />
                                <LoadingTile />
                                <LoadingTile />
                                <LoadingTile />
                                <LoadingTile />
                                <LoadingTile />
                            </>
                        )



                    }

                </div>
            </div>
        </div>
    )
}


export default function LandingPage() {
    const router = useRouter();
    const [user, loading] = useUser()
    const [projectList, setProjectList] = useState<any[]>([])
    const [refresh, setRefresh] = useState(true)
    const [currentTheme, loadingTheme] = useCurrentTheme()
    const [theme, setTheme] = useState<string>()
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [filteredList , setFilteredList] = useState<any[]>([])
    

    const addProject = (project: any) => {
        setFilteredList((prev) => [project, ...prev]);
        setProjectList((prev)=>[project,...prev]);
    }

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

    // filter projects by project name
    const searchProjects=(projectName:string)=>{
        const results =  projectList.filter((project)=>{
            return project.project.name.toLowerCase().includes(projectName.toLocaleLowerCase())
        })
        setFilteredList(results)
    }

    useEffect(
        () => {

            //only get data when user data is loaded
            if (user) {
                const projects = async () => {
                    const results = await getProjects(user.id)
                    console.log("members")
                    console.log(results.member)
                    setProjectList(results.member);
                    setFilteredList(results.member)
                    return results.project;
                }


                if (refresh) {
                    projects();
                    //created filtered list  from project list
                    //setFilteredList((prev)=>[...prev,projectList]);

                }
                //set current theme
                if (currentTheme != null) {
                    setTheme(currentTheme as unknown as string)
                }

            }


        }, [theme, filteredList, isRefresh]
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
                <ProjectHero projects={filteredList} parent={parent} search={searchProjects} />
            </main>
            <ProjectModal userID={user?.id} addProject={addProject} />
        </div>
    )
} 
