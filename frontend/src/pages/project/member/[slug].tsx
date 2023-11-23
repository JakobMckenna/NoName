/* eslint-disable */

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { RefCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Navbar from "~/components/navbar";

import useUser from "~/hooks/use_user";

import config from "config";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Spinner from "~/components/modal_spinner";
import BackPage from "~/components/back_navigation";

function Form({
    projectID,

    update,
    users,
}: {
    projectID: string;

    update: any;
    users: any;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    const handleMemberAdd = async (data: any) => {
        console.log("submit");
        try {
            const response = await axios.post(
                `${config.backendApiUrl}/projects/member`,
                { userID: parseInt(data.userID), projectID: projectID },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            //  console.log("Login successful", response.data);
            //  const members = response.data.members.
            update(response.data.projects.user)

        } catch (error) {
            console.log(error);
            //changeError("user does not exists ");
        }
    };

    return (
        <form
            className="flex flex-row"
            onSubmit={handleSubmit(handleMemberAdd)}
        >
            <div className="form-control">
                <select
                    {...register("userID")}
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={"init"}
                >
                    <option value={"init"} disabled >
                        Pick a user
                    </option>
                    {users.map((user: any) => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}#{user.id}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="form-control">
                <button className="btn  btn-accent" disabled={isSubmitting}>
                    {isSubmitting && (
                        <Spinner />
                    )}
                    {isSubmitting ? "Adding Member" : "Add Member"}
                </button>
            </div>
        </form>
    );
}

function Member({ name, email, projectID, userID, signInUser, owner ,removeMember }: any) {
  
    const isSignedUser:boolean = signInUser== userID;
    return (
        <>
            
            <div className="mb-10 flex flex-row justify-between px-6">
                <>
                    <div className="w-54 max-w-max ">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                    <div>
                        {owner !== userID ? (
                            <button
                                disabled={isSignedUser}
                                onClick={async () => {
                                    if(signInUser!= userID){
                                        await removeMember(projectID, userID);
                                    }
                                }}
                                className="btn btn-primary"
                            >
                                Remove
                            </button>
                        ) : (
                            <p>Owner</p>
                        )}
                    </div>
                </>
            </div>
        </>
    );
}

function MemberBoard({
    members,
    projectID,
    owner,
    update,
    removeMember,
    users,
    userID,
    animate,
}: { members: any[], projectID: string, owner: number, update: any,userID:number,removeMember:any, users: any, animate: RefCallback<Element> }) {
    return (
        <div className="m-6 flex h-5/6  w-[420px] flex-col   rounded-md border-black bg-base-200  p-6 ">
            <div className="mb-3 flex flex-col px-3">
                <Form
                    projectID={projectID}
                    // changeError={changeError}
                    update={update}

                    users={users}
                />

            </div>
            <div ref={animate} className="h-3/4 overflow-auto">
                {members.map((member: any) => {
                    return (
                        <Member
                            key={member.id}
                            name={member.name}
                            email={member.email}
                            userID={member.id}
                            projectID={projectID}
                            owner={owner}
                            signInUser={userID} 
                            removeMember={removeMember}

                        />
                    );
                })}
            </div>
        </div>
    );
}

export default function MemberPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [users, setUsers] = useState([]);

    // const [user, loading] = useUser();
    const [members, setMembers] = useState<any[]>([]);
    const [ownerID, setOwnerID] = useState<number>(0);
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(true);
    const [parent, enableAnimations] = useAutoAnimate()
    const [userID , setUserID] = useState<number>(0)



    const projectID = router.query.slug;

    const updateMemberList = (members: any[]) => {
        setMembers(members)
    }

    const getUsers = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/users`;
            const results = await axios.get(reqUrl);
            if (results.data && results.data.users) {
                // console.log(results.data.users);
                // setMembers(results.data.members.user);
                setUsers(results.data.users)
            }

            //  console.log(results.data);
            //setRefresh(false);
            return results.data;
        } catch (error) {
            console.log("failed");
            return null;
        }
    };

    const getResponse = async (userID: string) => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/member/${userID}`;
            const results = await axios.get(reqUrl);
            if (results.data && results.data.members && results.data.members.user) {
                //   console.log(results.data.members.user);
                setMembers(results.data.members.user);
            }
            if (
                results.data &&
                results.data.members &&
                results.data.members.project
            ) {
                setOwnerID(results.data.members.project.userId);
            }
            // console.log(results.data);
            setRefresh(false);
            return results.data.members.user;
        } catch (error) {
            console.log("failed");
            return null;
        }
    };

    const removeMember = async (projectID: string, userID: number) => {
        try {
            const reqUrl = `${config.backendApiUrl}/projects/member/${projectID}/${userID}`;
            const results = await axios.delete(reqUrl);
            if (results.data && results.data.members) {
                // console.log(results.data.projects.members)
                //  setMembers(results.data.members)
            }
            setMembers(results.data.projects.members);
            // refresh(true);
            return results.data;
        } catch (error) {
            console.log("failed");
            return null;
        }
    };

    useEffect(() => {
        if (projectID != null && projectID != undefined && user!=null) {
            const projects = async () => {
                const results = await getResponse(String(router.query.slug));
                // console.log("members");
                return results
            };
            if (refresh) {
                setUserID(user.id)
                getUsers()
                projects();
            }
        }
    }, [user,projectID, members]);

    return (
        <div>
            <Head>
                <title>DevDiaries | Member</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar userName={`${user?.name}#${user?.id}`} />
            <main ref={parent} className="container h-screen mx-auto mr-5">
                {projectID != null ? (<BackPage link={`/project/${projectID}`} name={`Back to  Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                <MemberBoard
                    projectID={projectID as string}
                    members={members}
                    owner={ownerID}
                    users={users}
                    userID={userID}
                    //  error={error}
                    update={updateMemberList}
                    removeMember={removeMember}
                    animate={parent}

                />
            </main>
        </div>
    );
}



