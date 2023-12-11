/* eslint-disable */

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { RefCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "~/hooks/use_user";
import config from "config";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Spinner from "~/components/modal_spinner";
import BackPage from "~/components/back_navigation";
import _ from "lodash";
import Drawer from "~/components/drawer";

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
        formState: { isSubmitting },
    } = useForm();

    const handleMemberAdd = async (data: any) => {
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

            update(response.data.projects.user)

        } catch (error) {
            console.log(error);
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

function Member({ name, email, projectID, userID, signInUser, owner, removeMember, changeLoading }: any) {
    const [clicked, setClicked] = useState(false);
    
    return (
        <>

            <div className="mt-10 flex flex-row overflow-y-hidden justify-between px-6 ">
                <>
                    <div className="w-54 max-w-max ">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                    <div>
                        {owner !== userID ? (
                            <button
                                disabled={clicked}
                                onClick={async () => {
                                    if (signInUser != userID) {
                                        try {
                                            setClicked(true);
                                            changeLoading(true);
                                            await removeMember(projectID, userID);

                                        } catch (error) {
                                            console.log(error);

                                        } finally {
                                            setClicked(false);
                                            changeLoading(false);
                                        }

                                    } else {
                                        const modalElement: any = document.getElementById('del_mem')
                                        modalElement.showModal()
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
}: { members: any[], projectID: string, owner: number, update: any, userID: number, removeMember: any, users: any, animate: RefCallback<Element> }) {
    const [loading, setLoading] = useState(false);
    return (
        <div className=" flex  flex-col h-3/4   overscroll-none overflow-x-none  overflow-y-hidden  w-[420px] ml-2.5  rounded-md border-black bg-base-200  px-6 py-4 md:ml-0">
            <div className="flex flex-col h-fit  mb-0  px-3">
                <Form
                    projectID={projectID}
                    update={update}
                    users={users}
                />

            </div>
            <div ref={animate} className=" h-full overflow-y-auto overflow-x-none " >
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
                            changeLoading={
                                (val: boolean) => setLoading(val)
                            }

                        />
                    );
                })}

                <div className="flex flex-row h-1/6 overflow-x-none overscroll-none   justify-center items-end text-center">
                    {
                        loading && (<><Spinner />
                            <p>{members.length != 0 ? "Removing user" : "loading"}</p></>)
                    }
                </div>

            </div>





        </div>
    );
}

function RemoveModal({ deleteMember, projectID, userID, goHome }: { deleteMember: any, projectID: string, userID: number, goHome: any }) {
    const [deleting, setDeleting] = useState(false);

    return (
        <dialog id="del_mem" className="modal">
            <div className="modal-box prose">
                <h3 className="font-bold text-lg">Are you sure you want to leave this project</h3>
                <div className="flex flex-row justify-around">
                    <button
                        className="btn  btn-warning btn-lg"
                        onClick={
                            async () => {
                                const modalElement: any = document.getElementById('del_mem');
                                try {
                                    setDeleting(true);
                                    const deletedMember = await deleteMember(projectID, userID);
                                    console.log(deletedMember);
                                    setDeleting(false);
                                    goHome();
                                    modalElement.close();


                                } catch (error) {
                                    console.log(error);

                                }

                            }
                        }
                        disabled={deleting}
                    >
                        {deleting && (
                            <Spinner />
                        )}
                        {deleting ? "deleting" : "yes"}
                    </button>
                    <button
                        className="btn btn-neutral btn-lg"
                        onClick={
                            () => {
                                const modalElement: any = document.getElementById('del_note')
                                modalElement.close()
                            }
                        }
                        disabled={deleting}
                    >
                        no
                    </button>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                {/* if there is a button in form, it will close the modal */}
                <button>close</button>
            </form>


        </dialog>
    )
}

export default function MemberPage() {
    const router = useRouter();
    const [user, loading] = useUser();
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState<any[]>([]);
    const [ownerID, setOwnerID] = useState<number>(0);

    const [refresh, setRefresh] = useState(true);
    const [parent, enableAnimations] = useAutoAnimate();
    const [userID, setUserID] = useState<number>(0)


    const projectID = router.query.slug;

    const goToHome = () => {
        router.push("/home");
    }



    const updateMemberList = (members: any[]) => {
        const membersSorted = _.sortBy(members, "name");
        setMembers(membersSorted);
    }

    const getUsers = async () => {
        try {
            const reqUrl = `${config.backendApiUrl}/users`;
            const results = await axios.get(reqUrl);
            if (results.data && results.data.users) {
                setUsers(results.data.users);
            }

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
                const members = results.data.members.user
                const membersSorted = _.sortBy(members, "name");
                setMembers(membersSorted);
            }
            if (
                results.data &&
                results.data.members &&
                results.data.members.project
            ) {
                setOwnerID(results.data.members.project.userId);
            }
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
            if (results.data && results.data.projects.members) {
                const members = results.data.projects.members;
                const membersSorted = _.sortBy(members, "name");
                setMembers(membersSorted);
            }
            return results.data;
        } catch (error) {
            console.log("failed");
            return null;
        }
    };

    useEffect(() => {
        if (projectID != null && projectID != undefined && user != null && !loading && refresh) {
            setUserID(user?.id);
            getUsers();
            const projects = async () => {
                const results = await getResponse(router.query.slug as string);
                return results;
            };

            projects();

        }
    }, [user, projectID, members]);

    return (
        <div>
            <Head>
                <title>DevDiaries | Member</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Drawer userName={user != null && (user.name != undefined || user.name != null) ? `${user.name}#${user.id}` : ""}>
                <main ref={parent} className="container h-screen mx-auto mr-5">
                    {projectID != null ? (<BackPage link={`/project/${projectID}`} name={`Back to  Project page`} />) : (<div className="skeleton h-9 w-96 mb-5"></div>)}
                    <MemberBoard
                        projectID={projectID as string}
                        members={members}
                        owner={ownerID}
                        users={users}
                        userID={userID}
                        update={updateMemberList}
                        removeMember={removeMember}
                        animate={parent}
                    />
                </main>

                <RemoveModal deleteMember={removeMember} projectID={projectID as string} userID={userID} goHome={goToHome} />
            </Drawer>
        </div>
    );
}



