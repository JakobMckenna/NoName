/* eslint-disable */

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import usePrevChat from "~/hooks/use_prev_chat";

interface Chat {
    name: string;
    message: string;
    userID: string;
}

function Form({ sendMessage }: { sendMessage: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        try {
            sendMessage(data.message)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="flex flex-row " onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control ">
                <textarea {...register("message")} className="textarea textarea-bordered" placeholder="type here" required />
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary">Send</button>

            </div>

        </form>
    )
}


const ChatBox = ({ socket, projectID, name, userID }: { socket: Socket, projectID: string, name: string, userID: string }) => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([])
    const [prevChats,isLoading]= usePrevChat(projectID)
    const sendMessage = (msg: string) => {
        socket.emit("message", { room: projectID, message: msg, name: name, userID: userID })
    }

    const messageEvent = (data: Chat)=>{
        console.log(data);
        setChatHistory((messages) => [...messages, data])
    }

    useEffect(() => {
     
        socket.on("message", messageEvent)
        return () => {
            socket.off("message", messageEvent);
          };
      
    }, [])
    return (
        <div className="flex flex-col mx-10 w-full h-full overflow-y-none">
            <div className="h-3/5 mb-10 overflow-y-auto ">
                {
                    // chats previousily saved in db
                   prevChats!=null && prevChats.map((chat:any, index:number) => {
                        return (<div key={index} className={userID==chat.userID?"chat chat-start ":"chat chat-end"}>
                            <div className="chat-header">
                                {chat.user.name}
                            </div>
                            <div className={userID==chat.userID?"chat-bubble chat-bubble-accent":"chat-bubble"}>{chat.message}</div>

                        </div>)
                    }
                    )
                }
                {
                    // chats live on socket
                    chatHistory.map((chat, index) => {
                        return (<div key={index} className={userID==chat.userID?"chat chat-start  ":"chat chat-end"}>
                            <div className="chat-header">
                                {chat.name}
                            </div>
                            <div className={userID==chat.userID?"chat-bubble chat-bubble-accent":"chat-bubble"}>{chat.message}</div>

                        </div>)
                    }
                    )
                }

            </div>
            <div className="w-full h-1/5 overflow-y-none">
                <Form sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default ChatBox;