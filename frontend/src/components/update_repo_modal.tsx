/* eslint-disable */
import axios from 'axios';
import { useForm } from "react-hook-form";

import config from 'config';
import { useState } from 'react';
import Spinner from './modal_spinner';

function Form({projectID ,githubID}:{projectID:string,githubID:string}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();

    const [loading ,setLoading] = useState(false);


    const handleCreateProject = async (data:any) => {
        setLoading(true)
        console.log(githubID)
        try{
            const response = await axios.post(`${config.backendApiUrl}/projects/repo`, { owner: data.owner ,repoName:data.repo,projectID:projectID,repoID:githubID}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('create repo', response.data);
            const modalElement: any = document.getElementById('update_repo');
            setLoading(false)
            modalElement.close();

        }catch(error){
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary">Owner</span>
                </label>
                <input {...register("owner")} type="text" placeholder="owner" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-secondary ">Repo Name</span>
                </label>
                <input {...register("repo")} type="text" placeholder="repo name" className="input input-bordered" required />
             

            </div>
            <div className="form-control mt-6">
                    <button className="btn btn-primary" disabled={loading}>
                    {loading && (
                            <Spinner />
                        )}
                       {loading?"Adding Repo":"Add Repo"}
                    </button>

            </div>
        </form>
    )
}

const UpdateRepoModal = ({projectID , githubID}:{projectID:string ,githubID:string}) => {
    return (
        <dialog id="update_repo" className="modal">
            <div className="modal-box ">
                <h2 className="font-bold text-lg uppercase">Update Github Repository</h2>
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
                <Form projectID={projectID} githubID={githubID} />
            </div>
        </dialog>
    );
}

export default UpdateRepoModal;