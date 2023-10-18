import useUser from "~/hooks/use_user"
import { useRouter } from 'next/router'
import Navbar from "~/components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Project() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [projectData , setProjectData]= useState()
    const projectID:string = String(router.query.slug);

    const getProjectData =async (id:string)=>{
        const reqUrl = `http://localhost:5000/projects/${id}`
        const results = await axios.get(reqUrl)
      //  console.log(results.data.projects)
        return results.data.projects

    }

    useEffect(
        () => {
           
            if (user) {
              // console.log
              const getData =async ()=>{
                const results = await getProjectData(projectID);
                setProjectData(results);
              }

              getData();

              
            }


        }, [loading, user,getProjectData(projectID)]
    )

    return (
        <div>
            <Navbar userName={user?.email}  />
           
            <main className="container ml-80 pl-10">
                <h1 className="text-4xl uppercase">{projectData?.name} PROJECT</h1>
            </main>
        </div>
    )

}