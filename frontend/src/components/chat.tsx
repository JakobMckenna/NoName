/* eslint-disable */

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";


interface User {
    id: string;
    name: string;
}


interface Chat {
    id: string;
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

function ChatActions({ scrollDown, scrollUp, searchMessage, scrollToMsg, messages }: { scrollDown: Function, scrollUp: Function, searchMessage: Function, scrollToMsg: Function, messages: Chat[] }) {
    const [typing, setTyping] = useState(false);
    return (
        <div className="flex flex-col justify-start md:flex-row md:justify-between items-end w-full mb-4">
            <div className="dropdown dropdown-hover">
                <input
                    tabIndex={0}
                    type="text"
                    placeholder="Search message"
                    className="input input-bordered input-primary w-full max-w-xs py-5"
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
                                            <div onClick={
                                                () => {
                                                    setTyping(false);
                                                    scrollToMsg(chat.id);

                                                }}
                                                className="flex flex-col w-full  p-2 ">
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



    const handleSendMessage = async (data: any) => {
        console.log("submit")
        try {
            sendMessage(data.message);

            setValue("message", "");
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <form className="flex flex-row w-full " onSubmit={handleSubmit(handleSendMessage)} >
            <div className="form-control w-4/5">
                <textarea {...register("message")}
                    className="textarea textarea-bordered w-full "
                    placeholder="Type here and press enter on your keyboard to send or click send button "
                    onKeyDown={
                        (event) => {
                            if (event.key === `Enter`) {
                                event.preventDefault();
                                handleSubmit(handleSendMessage)();
                            }
                        }
                    }
                    required />
            </div>
            <div className="form-control w-1/5 ">
                <button
                    className={!isSubmitting ? "btn btn-primary" : "btn btn-primary glass skeleton"}
                    disabled={isSubmitting}
                >
                    Send
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>


                </button>

            </div>

        </form>

    )
}


const ChatBox = ({ socket, projectID, name, userID, messages }: { socket: Socket, projectID: string, name: string, userID: string, messages: any }) => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Chat[]>([]);
    const chatBox = useRef<HTMLDivElement | null>(null);
    const topChatBox = useRef<HTMLDivElement | null>(null);
    const [parent, enableAnimations] = useAutoAnimate();

    const getMessages = (searchVal: string) => {
        return chatHistory.filter((message: Chat) => {
            return message.message.toLowerCase().includes(searchVal.toLowerCase())
        })
    }


    const searchMessage = (msg: string) => {
        const messages = getMessages(msg);
        setFilteredMessages(messages);
    }

    /**
     * scrollDown
     * scrolls down to bottom of chat container
     */
    const scrollDown = () => {
        if (chatBox.current) {
            chatBox.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }



    const messageEvent = (data: Chat) => {
        scrollDown();
        console.log(data);
        setChatHistory((messages) => [...messages, data]);
    }



    const scrollUP = () => {
        if (topChatBox.current) {
            topChatBox.current.scrollIntoView({ behavior: "smooth", block: "end" })

        }
    }

    const sendMessage = (msg: string) => {


        socket.emit("message", { room: projectID, message: msg, name: name, userID: userID });


    }

    const scrollToMessage = (messageID: string) => {
        const message = document.getElementById(messageID);
        message?.scrollIntoView({ behavior: 'smooth' });
    }


    useEffect(() => {
        setChatHistory((prev) => [...messages])
        scrollDown()
        socket.on("message", messageEvent)
        return () => {
            socket.off("message", messageEvent);
        };

    }, [messages])



    return (

        <div className="flex flex-col  w-[405px] md:w-[512px]  max-w-lg h-screen overflow-y-none">
            <ChatActions
                scrollDown={scrollDown}
                scrollUp={scrollUP}
                searchMessage={searchMessage}
                messages={filteredMessages}
                scrollToMsg={scrollToMessage}
            />

            <div
                // ref={chatBox}
                ref={parent}
                className="bg-base-200  h-3/5 mb-6 overflow-y-auto px-10 pt-5  pb-20"
            >
                <span ref={topChatBox} />



                {
                    // chats live on socket
                    chatHistory.length > 0 && chatHistory.map((chat, index) => {
                        const rightNowDate = new Date()
                        //  const date: string = convDate(rightNowDate.toISOString());
                        const timestamp = chat?.timestamp;
                        const date = convDate(timestamp);
                        const currDate = convDate(rightNowDate.toISOString());
                        return (
                            <div key={index} id={chat.id} className={userID == chat.user.id ? "chat chat-start " : "chat chat-end "}>
                                <div className="chat-header">
                                    {chat.user.name}#{chat.user.id}
                                    <time className="text-xs opacity-50">{timestamp ? date : currDate}</time>
                                </div>
                                <div className={userID == chat.user.id ? "chat-bubble chat-bubble-primary" : "chat-bubble"}>{chat.message}</div>

                            </div>
                        )
                    }

                    )

                }


                <div ref={chatBox} className="mt-24" >
                    <span />
                </div>

            </div>


            <div className="flex flex-row  w-full    overflow-y-none">
                <Form sendMessage={sendMessage} />
            </div>
        </div>

    );
}

export default ChatBox;