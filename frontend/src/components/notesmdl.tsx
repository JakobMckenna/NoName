/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";

import config from "config";
import Spinner from "./modal_spinner";
import FormAlert from "./form_alert";

function Form({ projectID, userID, sprintID, sprints, addNotes, refresh }: { projectID: string, userID: string, sprintID: string, sprints: any, addNotes: any, refresh: any }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        setValue
    } = useForm();



    const handleCreateProject = async (data: any) => {

        try {
            const response = await axios.post(`${config.backendApiUrl}/projects/notes`, { title: data.title, details: data.details, projectID: projectID, userID: userID, sprintID: data.sprint, urlList: [{ url: data.url }] }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('added Notes', response.data);
            //const note = response.data.notes
            if (response.data.notes == null) {
                console.log("bad input")
                setError("notes",
                    {
                        type: "server",
                        message: `Bad input, details or Title might be too long`
                    }
                )
                throw new Error("")
                //return null

            }
            const note = response.data.notes
            addNotes(
                {
                    id: note.id,
                    title: note.title,
                    details: note.details,
                    link: note.link
                }
            )
            // refresh(true);
            const modalElement: any = document.getElementById('my_modal_2')
            modalElement.close()

        } catch (error) {
            if (axios.isAxiosError(error)) {

                //console.log(error.response.status);
                //  console.log(error.response.data);
                if (error.response) {
                    setError("notes",
                        {
                            type: "server",
                            message: `failed . Details or Title might be too long`
                        }


                    )
                } else {
                    setError("notes",
                        {
                            type: "server",
                            message: `Bad input`
                        }


                    )
                }
            }
            //setAdding(false);
        } finally {
            setValue("sprint", "");
            setValue("title", "");
            setValue("details", "");
            setValue("url", "");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Sprint</span>
                </label>
                <select  {...register("sprint")} className="select select-bordered w-full max-w-xs" disabled={isSubmitting} required>
                    {
                        sprints && sprints.map((sprint: any) => {
                            return (
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
                <input {...register("title")} type="text" placeholder="title" className="input input-bordered" disabled={isSubmitting} required />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Details</span>
                </label>
                <textarea
                    {...register("details")}
                    placeholder="type the main things you learnt"
                    className="textarea textarea-bordered"
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Url</span>
                </label>
                <input
                    {...register("url")}
                    type="text"
                    placeholder="url"
                    className="input input-bordered"
                    disabled={isSubmitting}
                    required
                />
            </div>

            {errors.notes && (<div className="mt-6"><FormAlert message={String(errors.notes.message)} /></div>)}
            <div className="form-control mt-6">
                <button
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting && (
                        <Spinner />
                    )}
                    {isSubmitting ? "Creating Note" : "Create Note"}
                </button>

            </div>
        </form>
    )
}






const NotesModal = ({ projectID, userID, sprints, addNotes, refresh }: { projectID: string, userID: string, sprints: any, addNotes: any, refresh: any }) => {
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
                <Form projectID={projectID} userID={userID} sprintID={sprint} sprints={sprints} addNotes={addNotes} refresh={refresh} />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default NotesModal;