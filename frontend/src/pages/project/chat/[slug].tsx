import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import ChatBox from "~/components/chat";
import Navbar from "~/components/navbar";
import useChatSocket from "~/hooks/use_chat_socket";

export default function ChatPage() {
    const router = useRouter();
    
    const projectID = String(router.query.slug);
    const [socket,loading] = useChatSocket(projectID)

    
    useEffect(
        () => {
          
            if (projectID != null || projectID != undefined) {
                console.log(projectID)
                

            }
        }, [loading]
    )
    return (
        <div className="">
            <Navbar userName="" />
            <div className="container px-72 h-screen  min-h-full overflow-y-none">
                <ChatBox />
            </div>
            
        </div>
    )


}