/* eslint-disable */

import axios from "axios";
import config from 'config';
import { useState } from "react";
import Spinner from "./modal_spinner";

const DeleteModal = ({ projectID, home }: { projectID: string, home: any }) => {
    const [deleting, setDeleting] = useState(false);

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

        } catch (error) {
            console.log(error)
            throw new Error()

        }
    }
    return (
        <dialog id="del_proj" className="modal">
            <div className="modal-box flex flex-col items-center space-y-4">
                <h3 className="text-lg font-bold m-5">Are you sure you want to delete this project?</h3>
                <div className="flex flex-row space-x-4">
                    <button
                        className="btn btn-warning btn-md"
                        onClick={
                            async () => {
                                try {
                                    setDeleting(true)

                                    const deletedProject = await deleteProject();
                                    setDeleting(false)

                                } catch (error) {
                                    console.log(error);
                                }

                            }
                        }
                        disabled={deleting}
                    >
                        {deleting&&(
                            <Spinner />
                        )}
                        {deleting?"deleting":"Delete"}
                    </button>
                    <button
                        className="btn btn-neutral btn-md"
                        onClick={
                            () => {
                                const modalElement: any = document.getElementById('del_proj')
                                modalElement.close()
                            }
                        }
                        disabled={deleting}
                    >
                        Cancel
                    </button>
                </div>
                
             
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>


        </dialog>
    );
}

export default DeleteModal;