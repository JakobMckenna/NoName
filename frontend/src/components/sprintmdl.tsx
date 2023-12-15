/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'


import config from "config";
import Spinner from "./modal_spinner";
import { sprintValidation } from "~/validations_schemas/sprint_create";
import FormAlert from "./form_alert";

function Form({ projectID, add }: { projectID: string, add: any }) {
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, isSubmitSuccessful, isSubmitting },
    } = useForm({
        resolver: yupResolver(sprintValidation)
    });




    const submitSprint = async (data: any) => {

        try {
            const startDate = new Date(data.start);
            const deadlineDate = new Date(data.deadline);
            const responseSprint = await axios.post(`${config.backendApiUrl}/projects/sprint`, {
                sprintID: null,
                projectID: projectID,
                name: data.name,
                start: startDate.toISOString(),
                deadline: deadlineDate.toISOString(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            add(responseSprint.data.sprint)
            const modalElement: any = document.getElementById('sprint_modal')
            modalElement.close()
            reset();
            //refresh(true)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={handleSubmit(submitSprint)} >

            {errors && errors.name && <FormAlert message={errors.name.message as string} />}
           
            {errors && errors.start && <FormAlert message={errors.start.message as string} />}
           
            {errors && errors.deadline && <FormAlert message={errors.deadline.message as string} />}
            <span className="mt-10" />
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    {...register("name")}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                />

            </div>




            <div className="form-control">
                <label className="label">
                    <span className="label-text">start</span>
                </label>
                <input
                    {...register("start")}
                    onChange={
                        () => {
                            if (errors) {
                                clearErrors()
                            }
                        }
                    }
                    disabled={isSubmitting}
                    type="date"
                    placeholder="Start"
                    className="input input-bordered"
                    required
                />

            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">deadline</span>
                </label>
                <input
                    {...register("deadline")}
                    onChange={
                        () => {
                            if (errors) {
                                clearErrors()
                            }
                        }
                    }
                    disabled={isSubmitting}
                    type="date"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                />

            </div>

            <div className="form-control mt-6">
                <button
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (<><Spinner />{"Adding Sprint"}</>) : "Add Sprint"}
                </button>
            </div>
        </form>
    )
}

const SprintModal = ({ projectID, add }: { projectID: string, add: any }) => {
    return (
        <dialog id="sprint_modal" className="modal">
            <div className="modal-box prose">
                <h2 className="font-bold text-2lg uppercase">Create Sprint/Milestone</h2>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <Form
                    projectID={projectID}
                    add={add}
                />
            </div>
        </dialog>
    );
}

export default SprintModal;