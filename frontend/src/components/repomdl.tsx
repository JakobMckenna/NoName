/* eslint-disable */
import axios from 'axios';
import { useForm } from "react-hook-form";

import config from 'config';

function Form({projectID}:{projectID:string}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data:any) => {
        console.log("submit")
        try{
            const response = await axios.post(`${config.backendApiUrl}/projects/repo`, { owner: data.owner ,repoName:data.repo,projectID:projectID}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);
            const modalElement: any = document.getElementById('my_modal_4')
            modalElement.close()

        }catch(error){
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Owner</span>
                </label>
                <input {...register("owner")} type="text" placeholder="owner" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Repo Name</span>
                </label>
                <input {...register("repo")} type="text" placeholder="repo name" className="input input-bordered" required />
             

            </div>
            <div className="form-control mt-6">
                    <button className="btn btn-primary">Add Repo</button>

                </div>
        </form>
    )
}

const RepoModal = ({projectID}:{projectID:string}) => {
    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box ">
                <h2 className="font-bold text-lg uppercase">Add Github Repository</h2>
                <p>Enter data base on GitHub Repository URL</p>
                <div className="flex flex-row items-center  ">
                    <p className="text-info">https://github.com</p>
                    <p className="text-info">/</p>
                    <p className=" text-primary underline">owner</p>
                    <p className="text-info">/</p>
                    <p className=" text-secondary underline">repo</p>
                </div>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <Form projectID={projectID} />
            </div>
        </dialog>
    );
}

export default RepoModal;