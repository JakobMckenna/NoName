/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";

function Form({ projectID, userID ,sprintID ,sprints}: { projectID: string, userID: string ,sprintID:string,sprints:any }) {
    const {
        register,
        handleSubmit,
        formState: {},
    } = useForm();



    const handleCreateProject = async (data: any) => {
        console.log("submit")
        try {
            const response = await axios.post('http://localhost:5001/projects/notes', { title: data.title, details: "", projectID: projectID, userID: userID,sprintID:sprintID, urlList: [{ url: data.url }] }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Login successful', response.data);
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
                    <span className="label-text">Title</span>
                </label>
                <input {...register("title")} type="text" placeholder="title" className="input input-bordered" required />
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






const NotesModal = ({ projectID, userID ,sprints}: { projectID: string, userID: string ,sprints:any}) => {
   // const sprint = sprints[0].id;
    let sprint:string ="" ;
    console.log("sprints");
    console.log(sprints);
    if(sprints){
        sprint = sprints[0].id;
        console.log("id")
        console.log(sprint)
    }
    return (

        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <Form projectID={projectID} userID={userID} sprintID ={sprint} sprints={sprints} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default NotesModal;