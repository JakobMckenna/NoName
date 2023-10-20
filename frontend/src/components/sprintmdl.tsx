import axios from "axios";
import { useForm } from "react-hook-form";

function Form({ projectID }: { projectID: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm();




    const submitSprint = async (data: any) => {
        const startDate = new Date(data.start);
        const deadlineDate = new Date(data.deadline);
        const responseSprint = await axios.post('http://localhost:5000/projects/sprint', {
            sprintID:null,
            projectID: projectID,
            name: data.name,
            start: startDate.toISOString(),
            deadline:deadlineDate.toISOString(),
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(responseSprint.data)
    }
    return (
        <form onSubmit={handleSubmit(submitSprint)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input {...register("name")} type="text" placeholder="Name" className="input input-bordered" required />
            </div>

           

         
            <div className="form-control">
                <label className="label">
                    <span className="label-text">start</span>
                </label>
                <input {...register("start")} type="date" placeholder="Start" className="input input-bordered" required />

            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">deadline</span>
                </label>
                <input {...register("deadline")} type="date" placeholder="Name" className="input input-bordered" required />

            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary">Add Sprint</button>
            </div>
        </form>
    )
}

const SprintModal = ({projectID}:{projectID:string}) => {
    return (
        <dialog id="sprint_modal" className="modal">
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

export default SprintModal;