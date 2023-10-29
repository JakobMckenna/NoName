import router, { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { set } from "react-hook-form";
import { Socket, io } from "socket.io-client"
import ChatBox from "~/components/chat";
import Navbar from "~/components/navbar";
import useChatSocket from "~/hooks/use_chat_socket";
import usePrevChat from "~/hooks/use_prev_chat";
import useUser from "~/hooks/use_user";

export default function ChatPage() {
    const router = useRouter();
    const [user] = useUser();
    const projectID = String(router.query.slug);
    const [socket,loading] = useChatSocket(projectID);
    const [userName , setUserName]= useState("JohnDoe");
    const [userID , setUserID]= useState<string>("")
   // const [prevChats,isLoading]= usePrevChat(projectID)



    
    useEffect(
        () => {
          
            if (projectID != null || projectID != undefined) {
                console.log(projectID)
                console.log(user)

            }
           

           if (user!=null && user.name!=null){
            setUserName(user.name)
            setUserID(user.id)
           }
        },[loading]
    )
    return (
        <div className="">
            <Navbar userName="" />
            <div className="container px-72 h-screen  min-h-full overflow-y-none">
                {socket &&<ChatBox projectID={projectID} socket={socket as Socket} name={userName} userID={userID} />}
            </div>
            
        </div>
    )


}