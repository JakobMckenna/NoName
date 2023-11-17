/* eslint-disable */
import axios from 'axios';
import { useForm } from "react-hook-form";

import config from 'config';

function Form({userID,refresh}:{userID:number,refresh:any}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data:any) => {
        console.log("submit")
        try{
            const response = await axios.post(`${config.backendApiUrl}/projects`, { name: data.name ,userID:userID }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);
            refresh(true)
            const modalElement: any = document.getElementById('my_modal_3')
            modalElement.close()
         
        }catch(error){
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Create Project</button>

                </div>

            </div>
        </form>
    )
}

const ProjectModal = ({userID, refresh}:{userID:number, refresh:any}) => {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <Form userID={userID} refresh={refresh} />
            </div>
        </dialog>
    );
}

export default ProjectModal;