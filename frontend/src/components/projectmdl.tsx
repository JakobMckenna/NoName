/* eslint-disable */
import axios from 'axios';
import { useForm } from "react-hook-form";
import config from 'config';
import Spinner from './modal_spinner';
import FormAlert from './form_alert';
import { yupResolver } from '@hookform/resolvers/yup'
import { projectValidation } from '~/validations_schemas/project_create';

function Form({ userID, addProject }: { userID: number, addProject: Function }) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors , isSubmitting },
        setValue
    } = useForm({
        resolver: yupResolver(projectValidation)
    });

    const handleCreateProject = async (data: any) => {
        console.log("Project Name: ", data.name);
        try {
            const response = await axios.post(`${config.backendApiUrl}/projects`, { name: data.name, userID: userID }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('added project', response.data);
            const project = response.data.projects;


            const modalElement: any = document.getElementById('my_modal_3')
            modalElement.close()
            addProject({
                project: {
                    id: project.id,
                    name: project.name,
                    user:{name: "you recently"}
                }
            })

        } catch (error) {
            console.log(error)


            //user input was wrong type of input
            if (axios.isAxiosError(error) && error.response) {

                console.log(error.response.status);
                console.log(error.response.data);
                setError("name",
                    {
                        type: "server",
                        message: `You already have a project named ${data.name}`
                    }

                );
            } else {
                setError("name",
                    {
                        type: "server",
                        message: "Server is either down or not working"
                    });

            }
           
        }finally{
            setValue("name","");
        }
    }

    return (
        <form onSubmit={handleSubmit(handleCreateProject)} >
            <div className="form-control">
                {errors.name && (<FormAlert message={String(errors.name.message)} />)}
                <label className="label">
                    <span className="label-text">Project Name</span>
                </label>
                <input
                {...register("name")}
                    type="text"
                    placeholder="Project Name"
                    className="input input-bordered"
                    disabled={isSubmitting}
                    required
                   
                />

                <div className="form-control mt-6">
                    <button className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting && (
                            <Spinner />
                        )}
                        {isSubmitting ? "Creating Project" : "Create Project"}
                    </button>
                </div>
            </div>
        </form>
    )
}

const ProjectModal = ({ userID, addProject }: { userID: number, addProject: Function }) => {
    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box prose">
                <h2 className="font-bold text-2lg uppercase">Create Project</h2>
                <p>Please give your projects unique names i.e If you have a project called demo you can not make another called demo.</p>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <Form userID={userID} addProject={addProject} />
            </div>
        </dialog>
    );
}

export default ProjectModal;