/* eslint-disable */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import usePrevChat from "~/hooks/use_prev_chat";

interface User{
    id:string;
    name:string;
}


interface Chat {
    name: string;
    message: string;
    userID: string;
    timestamp: string;
    user:User;
}

function ChatActions({scrollDown ,scrollUp}:{scrollDown:Function , scrollUp:Function} ){
    return (
        <div className="flex flex-row justify-between items-end w-full mb-4">
            <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <div className="flex flex-row justify-end">
                <button className="btn btn-sm btn-success mr-4" onClick={()=>scrollDown()}>Latest Messages</button>
                <button className="btn btn-sm btn-info" onClick={()=>scrollUp()}>Oldest Messages</button>
            </div>


        </div>
    )
}

function Form({ sendMessage }: { sendMessage: any }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        try {
            sendMessage(data.message);
            setValue("message", "");
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <form className="flex flex-row w-full " onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control w-4/5">
                <textarea {...register("message")}
                    className="textarea textarea-bordered w-full "
                    placeholder="Type here and press enter on your keyboard to send or click send button "
                    onKeyDown={
                        (event) => {
                            if (event.key === `Enter`) {
                                event.preventDefault();
                                handleSubmit(handleCreateProject)();
                            }
                        }
                    }
                    required />
            </div>
            <div className="form-control w-1/5 ">
                <button className="btn btn-primary">Send</button>

            </div>

        </form>

    )
}


const ChatBox = ({ socket, projectID, name, userID }: { socket: Socket, projectID: string, name: string, userID: string }) => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);
    const [prevChats, isLoading] = usePrevChat(projectID);
    const chatBox = useRef<HTMLDivElement | null>(null)
    const topChatBox = useRef<HTMLDivElement | null>(null)

    const messageEvent = (data: Chat) => {
        console.log(data);
        setChatHistory((messages) => [...messages, data])
       // scroll()
    }
    const scrollDown = () => {
        if (chatBox.current) {
            chatBox.current.scrollIntoView({ behavior: "smooth", block: "end" })

        }
    }

    const scrollUP = () => {
        if (topChatBox.current) {
            topChatBox.current.scrollIntoView({ behavior: "smooth", block: "end" })

        }
    }

    const sendMessage = (msg: string) => {
        socket.emit("message", { room: projectID, message: msg, name: name, userID: userID });
        scrollDown()
    }


    const convDate = (date: string) => {
        const result = new Date(date)
        return ` ${result.toLocaleDateString()} ${result.toLocaleTimeString()}`

    }
    useEffect(() => {
        // scroll()
        setChatHistory((prev)=>[...prevChats])
        scrollDown()
        socket.on("message", messageEvent)
        return () => {
            socket.off("message", messageEvent);
        };

    }, [prevChats])
    return (

        <div className="flex flex-col  mx-10 w-full h-full overflow-y-none">
            <ChatActions scrollDown={scrollDown} scrollUp={scrollUP}  />
            <div className="bg-neutral-focus h-3/5 mb-6 overflow-y-auto px-10 pt-5 ">
                <span ref={topChatBox} />
            
                {
                    // chats live on socket
                    chatHistory.map((chat, index) => {
                        const rightNowDate = new Date()
                        const date: string = convDate(rightNowDate.toISOString());
                        return (<div key={index} className={userID == chat.user.id ? "chat chat-start  " : "chat chat-end"}>
                            <div className="chat-header">
                                {chat.user.name}#{chat.user.id}
                                <time className="text-xs opacity-50">{date}</time>
                            </div>
                            <div className={userID == chat.user.id ? "chat-bubble chat-bubble-primary" : "chat-bubble"}>{chat.message}</div>

                        </div>)
                    }
                    )
                }
                <div className="mb-24" ref={chatBox} />
            </div>
            <div className="flex flex-row w-full h-1/5 overflow-y-none">
                <Form sendMessage={sendMessage} />
            </div>
        </div>

    );
}

export default ChatBox;