import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Socket } from "socket.io-client";

interface Chat{
    name:string;
    message:string;
    userID:number;
}

function Form({sendMessage}:{sendMessage:any}) {
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


const ChatBox = ({socket,projectID,name,userID}:{socket: Socket, projectID:string,name:string,userID:number}) => {
    const [chatHistory ,setChatHistory]= useState<Chat[]>([])

    const sendMessage = (msg:string)=>{
        socket.emit("message",{room:projectID ,message:msg, name:name ,userID:userID})
    }

    const getMessage = ()=>{
        let result = null;
        socket.on("message",(data:any)=>{
            console.log(data);
            result = data;
        })
        return result;
    }

    useEffect(()=>{
        socket.on("message",(data:Chat)=>{
            console.log(data); 
            setChatHistory((messages)=>[...messages ,data])
           // result = data;
        })
    },[socket])
    return (
        <div className="flex flex-col mx-10 w-full h-full overflow-y-none">
            <div className="h-3/5 mb-10 overflow-y-auto ">

            </div>
            <div className="w-full h-1/5 overflow-y-none">
                <Form sendMessage={sendMessage} />
           </div>
        </div>
    );
}

export default ChatBox;