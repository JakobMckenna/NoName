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
import Drawer from "~/components/drawer";

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

function ProjectHero({ projects, parent, search, projectsInit }: { projects: any, parent: Ref, search: any, projectsInit: any }) {
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
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>


                            Add Project

                        </button>
                        <input
                            type="text"
                            placeholder="Find Project"
                            className="input input-bordered w-full max-w-xs"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    search(event.target.value)
                                }
                            }
                        />
                    </div>
                    {
                        projectsInit ? projects.map(
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
    const [projectList, setProjectList] = useState<any[] | null>(null)
    const [refresh, setRefresh] = useState(true)
    const [currentTheme, loadingTheme] = useCurrentTheme()
    const [theme, setTheme] = useState<string>()
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [filteredList, setFilteredList] = useState<any[]>([])



    const addProject = (project: any) => {
        setFilteredList((prev) => [project, ...prev]);
        setProjectList((prev: any) => [project, ...prev]);
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
    const searchProjects = (projectName: string) => {
        const results = projectList?.filter((project) => {
            return project.project.name.toLowerCase().includes(projectName.toLocaleLowerCase())
        })
        if (results)
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


        }, [user,theme, projectList, isRefresh]
    )
    return (
        <Drawer userName={user!=null && (user.name!=undefined || user.name!=null)?`${user.name}#${user.id}`:""}>
            <div className="w-full mx-auto">
                <Head>
                    <title>DevDiaries | user</title>
                    <meta name="description" content="Generated by create-t3-app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="container mx-auto">
                    <ProjectHero projects={filteredList} parent={parent} search={searchProjects} projectsInit={projectList} />
                </main>
                <ProjectModal userID={user?.id} addProject={addProject} />

            </div>
        </Drawer>

    )
} 
