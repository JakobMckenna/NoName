/* eslint-disable */

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";
import usePrevChat from "~/hooks/use_prev_chat";

interface User {
    id: string;
    name: string;
}


interface Chat {
    name: string;
    message: string;
    userID: string;
    timestamp: string;
    user: User;
}

const convDate = (date: string) => {
    const result = new Date(date)
    return ` ${result.toLocaleDateString()} ${result.toLocaleTimeString()}`

}

function ChatActions({ scrollDown, scrollUp, searchMessage, messages }: { scrollDown: Function, scrollUp: Function, searchMessage: Function, messages: Chat[] }) {
    const [typing, setTyping] = useState(false);
    return (
        <div className="flex flex-row justify-between items-end w-full mb-4">
            <div className="dropdown dropdown-hover">
                <input
                    tabIndex={0}
                    type="text"
                    placeholder="Search message"
                    className="input input-bordered input-primary w-full max-w-xs"
                    onChange={
                        (event: ChangeEvent<HTMLInputElement>) => {
                            const message = event.target.value
                            searchMessage(message);
                            setTyping(true);
                            if (message == "") {
                                setTyping(false);
                            }
                        }
                    }
                />
                {
                    typing && (<ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            messages.map(
                                (chat: Chat, index) => {
                                    const date = convDate(chat.timestamp)
                                    return (
                                        <li className="flex flex-row justify-start" key={index}>
                                            <div className="flex flex-col  p-2 ">
                                                <div>
                                                    <p>{chat.message} {chat.user.name}</p>
                                                    <p>{date}</p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>)}
            </div>
            <div className="flex flex-row justify-end">
                <button className="btn btn-sm btn-success mr-4" onClick={() => scrollDown()}>Latest Messages</button>
                <button className="btn btn-sm btn-info" onClick={() => scrollUp()}>Oldest Messages</button>
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
    const [filteredMessages, setFilteredMessages] = useState<Chat[]>([])
    const [search, setSearch] = useState("");
    const chatBox = useRef<HTMLDivElement | null>(null);
    const topChatBox = useRef<HTMLDivElement | null>(null);

    const getMessages = (searchVal: string) => {
        return chatHistory.filter((message: Chat) => {
            return message.message.toLowerCase().includes(searchVal.toLowerCase())
        })
    }

    const searchMessage = (msg: string) => {
        console.log(msg)
        setSearch(msg);
        const messages = getMessages(msg);
        setFilteredMessages(messages)
        // console.log(messages)

    }



    const messageEvent = (data: Chat) => {
        console.log(data);
        setChatHistory((messages) => [...messages, data]);
        // scroll()
        scrollDown();
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
        socket.emit("message", { room: projectID, message: msg, name: name, userID: userID  });
        scrollDown()
    }


   
    useEffect(() => {
        // scroll()
        setChatHistory((prev) => [...prevChats])
        scrollDown()
        socket.on("message", messageEvent)
        return () => {
            socket.off("message", messageEvent);
        };

    }, [prevChats])
    return (

        <div className="flex flex-col  mx-10 w-full h-full overflow-y-none">
            <ChatActions scrollDown={scrollDown} scrollUp={scrollUP} searchMessage={searchMessage} messages={filteredMessages} />
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
                <div className="mt-24" ref={chatBox} />
            </div>
            <div className="flex flex-row w-full h-1/5 overflow-y-none">
                <Form sendMessage={sendMessage} />
            </div>
        </div>

    );
}

export default ChatBox;