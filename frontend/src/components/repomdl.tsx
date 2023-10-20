import axios from 'axios';
import { useForm } from "react-hook-form";


function Form({projectID}:{projectID:string}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();



    const handleCreateProject = async (data:any) => {
        console.log("submit")
        try{
            const response = await axios.post('http://localhost:5001/projects/repo', { owner: data.owner ,repoName:data.repo,projectID:projectID}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);

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
                <input {...register("owner")} type="text" placeholder="owner" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register("repo")} type="text" placeholder="repo name" className="input input-bordered" required />
             

            </div>
            <div className="form-control mt-6">
                    <button className="btn btn-primary">Create Project</button>

                </div>
        </form>
    )
}

const RepoModal = ({projectID}:{projectID:string}) => {
    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
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