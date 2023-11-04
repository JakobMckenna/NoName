/* eslint-disable */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Navbar from "~/components/navbar";

import useUser from "~/hooks/use_user";


function Form({ projectID, changeError, refresh,users }: { projectID: string, changeError: any, refresh: any, users: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        try {
            const response = await axios.post('http://localhost:5001/projects/member', { userID: parseInt(data.userID), projectID: projectID }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);

            refresh(true)
        } catch (error) {
            console.log(error)
            changeError("user does not exists ")
        }
    }

    return (
        <form className="flex flex-row" onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">

                <input {...register("userID")} type="number" placeholder="userID" className="input input-bordered" onChange={
                    () => changeError("")
                } required />

                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Pick a user</option>
                    {
                        users.map(
                            (user:any)=>{
                                return(
                                    <option key={user.id} value={user.id}>
                                        {user.name}#{user.id}
                                       
                                    </option>
                                )
                            }
                        )
                    }
                </select>
            </div>
            <div className="form-control">
                <button className="btn">Add Member</button>

            </div>

        </form>
    )
}

function Member({ name, email, projectID, userID, owner, refresh }: any) {
    const removeMember = async (projectID: string, userID: number) => {
        try {
            const reqUrl = `http://localhost:5001/projects/member/${projectID}/${userID}`
            const results = await axios.delete(reqUrl)
            if (results.data && results.data.members) {
                // console.log(results.data.projects.members)
                //  setMembers(results.data.members)
            }
            console.log(results.data)
            refresh(true)
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
                    {owner !== userID ? <button onClick={
                        async () => {
                            await removeMember(projectID, userID)
                        }
                    } className="btn btn-primary">Remove</button> : <p>Owner</p>}
                </div>

            </>


        </div>
    )
}


function MemberBoard({ members, projectID, owner, error, changeError, refresh, users }: any) {
    return (
        <div className="flex flex-col bg-neutral-focus border-black rounded-md p-6  m-6 w-[425px] h-96 min-h-min">
            <div className="flex flex-col mb-3 px-3">
                <Form projectID={projectID} changeError={changeError} refresh={refresh} users={users} />
                <div className="text-color-red">{error}</div>
            </div>
            <div className="overflow-auto">
                {
                    members.map(
                        (member: any) => {
                            return (
                                <Member key={member.id} name={member.name} email={member.email} userID={member.id} projectID={projectID} owner={owner} refresh={refresh} />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}

export default function MemberPage({ userList }: any) {
    const router = useRouter();
    const [user, loading] = useUser()

    // const [user, loading] = useUser();
    const [members, setMembers] = useState([])
    const [ownerID, setOwnerID] = useState()
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(true)


    const projectID: string = String(router.query.slug);


    const getResponse = async (userID: string) => {
        try {
            const reqUrl = `http://localhost:5001/projects/member/${userID}`
            const results = await axios.get(reqUrl)
            if (results.data && results.data.members && results.data.members.user) {
                console.log(results.data.members.user)
                setMembers(results.data.members.user)
            }
            if (results.data && results.data.members && results.data.members.project) {
                setOwnerID(results.data.members.project.userId)
            }
            console.log(results.data)
            setRefresh(false)
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
                if (refresh) {
                    projects()
                }

            }


        }, [refresh]
    )

    return (
        <div>
            <Navbar userName="" />
            <main className="container mx-auto">
                <MemberBoard projectID={projectID} members={members} owner={ownerID} users={userList} error={error} refresh={(val: boolean) => {
                    setRefresh(val)
                    return val
                }} changeError={(msg: string) => setError(msg)} />
            </main>
        </div>
    )
}

// export async function getStaticPaths() {
//     const res = await fetch("http://localhost:5001/projects");
//     const projects = await res.json();
//     const paths =  projects.projects.map(
//         (project:any)=>{
//             return{
//                 params:{slug:project.id}
//             }
//         }
//     )
//     return {
//         paths,
//         fallback: false,
//     };
// }



// export async function getStaticProps(){
//     const res = await fetch("http://localhost:5001/users");
//     const users = await res.json();
//    // console.log(users);
//     return{
//         props:{
//             users,
//         }
//     }
// }

export async function getServerSideProps() {
    const res = await fetch("http://localhost:5001/users");
    const users = await res.json();
    const userList = users.users
    return {
        props: {
            userList,
        }
    }
}