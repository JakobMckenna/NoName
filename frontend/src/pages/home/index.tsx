/* eslint-disable */

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { themeChange } from 'theme-change'


import Navbar from "~/components/navbar";
import ProjectModal from "~/components/projectmdl";

import useUser from "~/hooks/use_user";

import config from "config";

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

function Tile({ id, name, user }: { id: string, name: string, user: string }) {
    return (
        <Link href={`/project/${id}`} className="card w-96 bg-primary glass text-primary-content shadow-xlw-full mb-10 hover:-translate-y-3 hover:-skew-y-3 duration-75">
            <div className="card-body">
                <h2 className="card-title">{name} </h2>
                <p> Created by {user} </p>
            </div>

        </Link>
    )
}
function ProjectHero({ projects }: { projects: any }) {
    return (
        <div className="hero  bg-base-100">
            <div className="hero-content ">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold">Dev Diaries</h1>
                    <button
                        className="btn btn-primary my-6"
                        onClick={
                            () => {
                                const modalElement: any = document.getElementById('my_modal_3')
                                if (modalElement) {
                                    modalElement?.showModal()
                                }
                            }
                        }
                    >Add Project</button>
                    {
                        projects.length > 0 ? projects.map(
                            (project: any, index: number) => {
                                const id = project.project.id;
                                const user = project.project.user?.name;
                                const projectName = project.project.name;

                                return (

                                    <Tile id={id} name={projectName} user={user} />
                                )
                            }
                        ) : (
                            <>
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
    //const [loading ,setLoading] = useState(true)
    // const [user ,setUser] =useState<any>(null)
    const router = useRouter();
    const [user, loading] = useUser()
    const [projectList, setProjectList] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [theme ,setTheme]= useState("dark")

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
            themeChange(false)
            const localTheme = localStorage.getItem("theme");




            if (localTheme != null) {
               setTheme(localTheme)
            }

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
            <Navbar userName={`${user?.name}#${user?.id}`} defaultTheme={theme} />
            <main>
                <ProjectHero projects={projectList} />
            </main>
            <ProjectModal userID={user?.id} refresh={(val: boolean) => setRefresh(val)} />
        </div>
    )
} 
