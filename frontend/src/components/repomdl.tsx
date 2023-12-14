

/* eslint-disable */
import axios from 'axios';
import { useForm } from "react-hook-form";
import config from 'config';
import Spinner from './modal_spinner';
import FormAlert from './form_alert';

function Form({ projectID , githubID ,addRepo }: { readonly projectID: string ,readonly githubID:string ,readonly addRepo:any }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        clearErrors,
        setValue
    } = useForm();

    
    const typeOfAdd = githubID?"Update Repo":"Add Repo";
    const loadingStatement = githubID?"Updating Repo":"Adding Repo";

    const handleCreateRepo = async (data: any) => {
        try {
            const response = await axios.post(`${config.backendApiUrl}/projects/repo`, { owner: data.owner, repoName: data.repo, projectID: projectID, repoID: githubID }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('create repo', response.data);
            const repo = response.data.github;
            addRepo(repo)
            const modalElement: any = document.getElementById('my_modal_4');
         
            modalElement.close();

        } catch (error) {
            // Repo the user entered does not exist
            if(axios.isAxiosError(error) && error.response?.status==404){
                console.log("repo does not exist")
                setError("repo",{
                    type:"server",
                    message:"Repo does not exist , please enter a valid owner and repo name."
                })
            }

            // clears inputs on form
            setValue("owner","");
            setValue("repo","");

        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateRepo)} >
            {errors.repo && (<FormAlert message={errors.repo?.message as string} />)}
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-primary">Owner</span>
                </label>
                <input
                    {...register("owner")}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="owner"
                    className="input input-bordered"
                    onChange={(e) => {
                        setValue("owner", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(""); 
                    }}
                    required
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text text-secondary ">Repo Name</span>
                </label>
                <input
                    {...register("repo")}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="repo name"
                    className="input input-bordered"
                    onChange={(e) => {
                        setValue("repo", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(""); 
                    }}
                    required
                />


            </div>
            <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting && (
                        <Spinner />
                    )}
                    {isSubmitting ? loadingStatement : typeOfAdd}
                </button>

            </div>
        </form>
    )
}

const RepoModal = ({ projectID , githubID ,addRepo}: { projectID: string , githubID: string  ,addRepo:any}) => {
    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box ">
                <h2 className="font-bold text-lg uppercase">{githubID?"update":"add"} Github Repository</h2>
                <p>Enter data base on GitHub Repository URL</p>
                <div className="flex flex-row items-center mb-5">
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
                <Form projectID={projectID}  githubID={githubID} addRepo={addRepo} />
            </div>
        </dialog>
    );
}

export default RepoModal;