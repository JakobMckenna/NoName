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
/**
 * convDate
 * convert iso date into local time
 * @param date  is the iso date you are trying to convert
 * @returns  local time string
 */
const convDate = (date: string) => {
    const result = new Date(date)
    return ` ${result.toLocaleDateString()} ${result.toLocaleTimeString()}`

}


function ChatActions({ scrollDown, scrollUp, searchMessage, scrollToMsg, messages }: { readonly scrollDown: any, readonly scrollUp: any, readonly searchMessage: any, readonly scrollToMsg: any, readonly messages: Chat[] }) {
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

function Form({ sendMessage }: { readonly sendMessage: any }) {
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


const ChatBox = ({ socket, projectID, name, userID, messages }: { readonly socket: Socket, projectID: string, name: string, userID: string, messages: any }) => {
    const [chatHistory, setChatHistory] = useState<Chat[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Chat[]>([]);
    const chatBox = useRef<HTMLDivElement | null>(null);
    const topChatBox = useRef<HTMLDivElement | null>(null);
    const [parent, enableAnimations] = useAutoAnimate();

    /**
     * getMessages
     * gets all messages that contain the searchVal value
     * @param searchVal 
     * @returns  
     */
    const getMessages = (searchVal: string) => {
        return chatHistory.filter((message: Chat) => {
            return message.message.toLowerCase().includes(searchVal.toLowerCase())
        })
    }


    /**
     * seacrch message gets all messages that contain a string of characters
     * @param msg is the characters or string user is searching for
     */
    const searchMessage = (msg: string) => {
        const messages = getMessages(msg);
        setFilteredMessages(messages);
    }

    /**
    * scrollUp
    * scrolls up to the top of message container
    */
    const scrollUP = () => {
        if (topChatBox.current) {
            topChatBox.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }


    /**
     * scrollDown
     * scrolls down to bottom of chat container
     */
    const scrollDown = () => {
        if (chatBox.current) {
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        }
    }


    /**
     * messageEvent
     * adds new message from socket to chat history array and scrolls down to new message
     * @param message is a new message from chat room socket
     */
    const messageEvent = (message: Chat) => {
        scrollDown();
        setChatHistory((messages) => [...messages, message]);
    }


    /**
     * sendMessage
     * sends message to chat room socket
     * @param message is the message being sent to chat room socket
     */
    const sendMessage = (message: string) => {
        try {
            socket.emit("message", { room: projectID, message: message, name: name, userID: userID });
        } catch (error) {
            alert("message failed to send , server must be down . Check console logs");
            console.log(error);
        }
    }

    /**
     * scrollToMessage
     * scrolls to the message with particular message ID
     * @param messageID  is the message that must come into view
     */
    const scrollToMessage = (messageID: string) => {
        //retrieve message by id 
        const message = chatBox.current?.querySelector(`#${messageID}`);
        if (chatBox?.current && message ) {
           // get the message dom rectangle
            const messageDomRect = message?.getBoundingClientRect();  
            // get the chat box dom rectangle
            const messagesDomRect = chatBox.current.getBoundingClientRect(); 
            // calculate relative postition of message based on messages container
            const offset =  messageDomRect.top - messagesDomRect.top; 
             // move the message container to that position
            chatBox.current.scrollTop = chatBox.current.scrollTop + offset; 
        }
    }


    useEffect(() => {
        setChatHistory((prev) => [...messages]);
        scrollDown();
        enableAnimations(true);
        socket.on("message", messageEvent);
        return () => {
            socket.off("message", messageEvent);
        };

    }, [messages])



    return (
        <div
            ref={parent}
            className="flex flex-col  w-[405px] md:w-[512px]  max-w-lg h-screen overflow-y-none"
        >
            <ChatActions
                scrollDown={scrollDown}
                scrollUp={scrollUP}
                searchMessage={searchMessage}
                messages={filteredMessages}
                scrollToMsg={scrollToMessage}
            />

            <div
                ref={chatBox}
                className="bg-base-200  h-3/5 mb-6 overflow-y-auto px-10 pt-5  pb-16"
            >
                <span ref={topChatBox} />



                {
                    // chat history includes messages saved on the db and messages being sent on the socket
                    chatHistory.length > 0 && chatHistory.map(
                        (chat) => {
                            return (
                                <div key={chat.id} id={chat.id} className={userID == chat.user.id ? "chat chat-start " : "chat chat-end "}>
                                    <div className="chat-header">
                                        {chat.user.name}#{chat.user.id}
                                        <time className="text-xs opacity-50">{chat.timestamp}</time>
                                    </div>
                                    <div className={userID == chat.user.id ? "chat-bubble chat-bubble-primary" : "chat-bubble"}>{chat.message}</div>

                                </div>
                            )
                        }

                    )

                }

                <div className="mt-5" >
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