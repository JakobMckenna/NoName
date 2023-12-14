/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";

import config from "config";
import Spinner from "./modal_spinner";
import FormAlert from "./form_alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { notesValidation } from "~/validations_schemas/notes_create";


function Form({ projectID, userID, sprints, addNotes }: { readonly projectID: string,readonly userID: string,readonly sprints: any,readonly addNotes: any }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        clearErrors,
        setValue
    } = useForm({
        resolver: yupResolver(notesValidation)
    });



    const handleCreateProject = async (data: any) => {

        try {
            const response = await axios.post(`${config.backendApiUrl}/projects/notes`, { title: data.title, details: data.details, projectID: projectID, userID: userID, sprintID: data.sprint, urlList: [{ url: data.url }] }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('added Notes', response.data);
           
            if (response.data.notes == null) {
                console.log("bad input");
                setError("details",
                    {
                        type: "server",
                        message: `Bad input, details or Title might be too long`
                    }
                );
                throw new Error("");
                

            }
            const note = response.data.notes;
            addNotes(
                {
                    id: note.id,
                    title: note.title,
                    details: note.details,
                    link: note.link
                }
            );
           
            const modalElement: any = document.getElementById('my_modal_2');
            modalElement.close();

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError("details",
                        {
                            type: "server",
                            message: `failed . Details or Title might be too long`
                        }


                    );
                } else {
                    setError("details",
                        {
                            type: "server",
                            message: `Bad input`
                        }


                    );
                }
            }
            
        } finally {
            setValue("sprint", "");
            setValue("title", "");
            setValue("details", "");
            setValue("url", "");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            {errors?.sprint && (<FormAlert message={errors.sprint.message as string} />)}
            {errors?.title && (<FormAlert message={errors.title.message as string} />)}
            {errors?.details && (<FormAlert message={errors.details.message as string} />)}
            {errors?.url && (<FormAlert message={errors.url.message as string} />)}


            <div className="form-control">
                <label className="label">
                    <span className="label-text">Sprint</span>
                </label>
                <select
                    {...register("sprint")}
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => {
                        setValue("sprint", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(); 
                    }}
                    disabled={isSubmitting}
                    required
                >
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
                <input
                    {...register("title")}
                    type="text"
                    placeholder="title"
                    className="input input-bordered"
                    onChange={(e) => {
                        setValue("title", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(); 
                    }}
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Details</span>
                </label>
                <textarea
                    {...register("details")}
                    placeholder="type the main things you learnt"
                    className="textarea textarea-bordered"
                    onChange={(e) => {
                        setValue("details", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(); 
                    }}
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
                    onChange={(e) => {
                        setValue("url", e.target.value); // Update the value in real-time so enter key works to submit
                        clearErrors(); 
                    }}
                    disabled={isSubmitting}
                    required
                />
            </div>

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






const NotesModal = ({ projectID, userID, sprints, addNotes }: { projectID: string, userID: string, sprints: any, addNotes: any }) => {
   
    return (

        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-2lg uppercase">Create Note</h2>
                <Form
                    projectID={projectID}
                    userID={userID}
                    sprints={sprints}
                    addNotes={addNotes}
                />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default NotesModal;