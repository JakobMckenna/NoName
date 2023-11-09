/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";

function Form({ projectID, userID, sprintID, sprints ,refresh }: { projectID: string, userID: string, sprintID: string, sprints: any ,refresh:any }) {
    const {
        register,
        handleSubmit,
        formState: { },
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        console.log(data.sprint)
        try {
            const response = await axios.post('http://localhost:5001/projects/notes', { title: data.title, details: data.details, projectID: projectID, userID: userID, sprintID: data.sprint, urlList: [{ url: data.url }] }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);
            refresh(true);
            const modalElement: any = document.getElementById('my_modal_2')
            modalElement.close()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Sprint</span>
                </label>
                <select  {...register("sprint")} className="select select-bordered w-full max-w-xs" required>
                    {
                     sprints &&  sprints.map((sprint:any)=>{
                            return(
                                <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                            )
                        })
                    }
                   
                   
                </select>
            </div>

           

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input {...register("title")} type="text" placeholder="title" className="input input-bordered" required />
            </div>
            
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Details</span>
                </label>
                <input {...register("details")} type="text" placeholder="details" className="input input-bordered" required />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Url</span>
                </label>
                <input {...register("url")} type="text" placeholder="url" className="input input-bordered" required />
            </div>

            <div className="form-control mt-6">
                <button className="btn btn-primary">Create Note</button>

            </div>
        </form>
    )
}






const NotesModal = ({ projectID, userID, sprints ,refresh}: { projectID: string, userID: string, sprints: any ,refresh:any }) => {
    // const sprint = sprints[0].id;
    let sprint: string = "";
    console.log("sprints");
    console.log(sprints);
    if (sprints) {
        sprint = sprints[0].id;
        console.log("id")
        console.log(sprint)
    }
    return (

        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <Form projectID={projectID} userID={userID} sprintID={sprint} sprints={sprints} refresh={refresh} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default NotesModal;