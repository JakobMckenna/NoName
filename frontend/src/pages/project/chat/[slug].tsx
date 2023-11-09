/* eslint-disable */
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

import { Socket, io } from "socket.io-client"
import ChatBox from "~/components/chat";
import Navbar from "~/components/navbar";
import useChatSocket from "~/hooks/use_chat_socket";

import useUser from "~/hooks/use_user";

export default function ChatPage() {
    const router = useRouter();
    const [user] = useUser();
    const projectID = String(router.query.slug);
    const [socket, loading] = useChatSocket(projectID);
    const [userName, setUserName] = useState("JohnDoe");
    const [userID, setUserID] = useState<string>("")
    // const [prevChats,isLoading]= usePrevChat(projectID)




    useEffect(
        () => {

            if (projectID != null || projectID != undefined) {
                console.log(projectID)
                console.log(user)

            }


            if (user != null && user.name != null) {
                setUserName(user.name)
                setUserID(user.id)
            }
        }, [loading]
    )
    return (
        <>
            <Head>
                <title>DevDiaries | Chat</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen">
                <Navbar userName={`${user?.name}#${user?.id}`} />
                <div className="container px-72  h-1/2  min-h-full overflow-y-none">
                    {socket && <ChatBox projectID={projectID} socket={socket as Socket} name={userName} userID={userID} />}
                </div>

            </div>
        </>
    )


}