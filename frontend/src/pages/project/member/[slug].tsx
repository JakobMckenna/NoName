import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbar";

import useUser from "~/hooks/use_user";


function Member({ name,email, projectID ,userID }: any) {
    const removeMember = async (projectID: string, userID: number) => {
        try {
            const reqUrl = `http://localhost:5001/projects/member/${projectID}/${userID}`
            const results = await axios.delete(reqUrl)
            if (results.data && results.data.members) {
                // console.log(results.data.projects.members)
                //  setMembers(results.data.members)
            }
            console.log(results.data)
            return results.data
        } catch (error) {

            console.log("failed")
            return null
        }
    }

    return (
        <div className="flex flex-row px-6 justify-between mb-10">

            <>
                <div className="w-54 max-w-max ">
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <div>
                    <button onClick={
                        async () => {
                            await removeMember(projectID, userID)
                        }
                    } className="btn btn-primary">Remove</button>
                </div>

            </>


        </div>
    )
}


function MemberBoard({ members ,projectID }: any) {
    return (
        <div className="flex flex-col bg-black border border-black rounded-md p-6  m-6 w-[425px] h-96 min-h-min">
            <div className="flex flex-row mb-3">
                <div className="">
                    <button className="btn ">Add New Member</button>
                </div>
            </div>
            <div className="overflow-auto">
                {
                    members.map(
                        (member: any) => {
                            return (
                                <Member key={member.id} name={member.name} email={member.email} userID={member.id} projectID={projectID} />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default function MemberPage() {
    const router = useRouter();
    const [user, loading] = useUser()
    
    // const [user, loading] = useUser();
    const [members, setMembers] = useState([])


    const projectID: string = String(router.query.slug);


    const getResponse = async (userID: string) => {
        try {
            const reqUrl = `http://localhost:5001/projects/member/${userID}`
            const results = await axios.get(reqUrl)
            if (results.data && results.data.members && results.data.members.user) {
                 console.log(results.data.members.user)
                setMembers(results.data.members.user)
            }
            console.log(results.data)
            return results.data
        } catch (error) {

            console.log("failed")
            return null
        }

    }

    useEffect(
        () => {

            if (projectID != null && projectID != undefined) {
                const projects = async () => {
                    const results = await getResponse(String(router.query.slug))
                    console.log("members")

                }
                projects()
            }


        },
    )

    return (
        <div>
            <Navbar userName="" />
            <MemberBoard projectID={projectID} members={members} />
        </div>
    )
}