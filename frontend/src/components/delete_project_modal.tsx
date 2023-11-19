import axios from "axios";

import config from 'config';

const DeleteModal = ({ projectID, home }: { projectID: string, home: Function }) => {

    const deleteProject = async () => {
        try {
            const response = await axios.delete(`${config.backendApiUrl}/projects/${projectID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('deleted project', response.data);
            const project = response.data.projects;

            home()
            const modalElement: any = document.getElementById('del_proj')
            modalElement.close()


            // refresh(true)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <dialog id="del_proj" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this project!</h3>
                <div className="flex flex-row justify-around">
                    <button
                        className="btn  btn-warning btn-lg"
                        onClick={
                            async () => {
                                await deleteProject();

                            }
                        }
                    >
                        yes
                    </button>
                    <button
                        className="btn btn-neutral btn-lg"
                        onClick={
                            () => {
                                const modalElement: any = document.getElementById('del_proj')
                                modalElement.close()
                            }
                        }
                    >
                        no
                    </button>
                </div>

            </div>
            <form method="dialog" className="modal-backdrop">
                {/* if there is a button in form, it will close the modal */}
                <button>close</button>
            </form>


        </dialog>
    );
}

export default DeleteModal;