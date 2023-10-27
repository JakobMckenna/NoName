import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
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
        <div>

        </div>
    )


}