import router, { useRouter } from "next/router";
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
    const [socket,loading] = useChatSocket(projectID);



    
    useEffect(
        () => {
          
            if (projectID != null || projectID != undefined) {
                console.log(projectID)


            }
           if (socket){
            socket.on("message",(data:any)=>{
                console.log(data);
               // result = data;
            })
           }
        }
    )
    return (
        <div className="">
            <Navbar userName="" />
            <div className="container px-72 h-screen  min-h-full overflow-y-none">
                {socket &&<ChatBox projectID={projectID} socket={socket as Socket}  />}
            </div>
            
        </div>
    )


}