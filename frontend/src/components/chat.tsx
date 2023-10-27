import axios from "axios";
import { useForm } from "react-hook-form";

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        try {
          

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


const ChatBox = (props: any) => {
    return (
        <div className="flex flex-col mx-10 w-full h-full overflow-y-none">
            <div className="h-3/5 mb-10 overflow-y-auto ">

            </div>
            <div className="w-full h-1/5 overflow-y-none">
                <Form />
           </div>
        </div>
    );
}

export default ChatBox;