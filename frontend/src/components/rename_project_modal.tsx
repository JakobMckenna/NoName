/* eslint-disable */

import axios from "axios";
import config from 'config';
import { useState } from "react";
import Spinner from "./modal_spinner";

const RenameModal = ({ projectID, projectName }: { projectID: string, projectName: string }) => {
    const [renamed, setRenamed] = useState(false)

    const renameProject = async () => {
        try {
            const response = await axios.delete(`${config.backendApiUrl}/projects/${projectID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('renamed project', response.data); //todo
            const project = response.data.projects;

        
            const modalElement: any = document.getElementById('rename_proj')
            modalElement.close()


            // refresh(true)

        } catch (error) {
            console.log(error)
            throw new Error()

        }
    }
    return (
        <dialog id="rename_proj" className="modal">
            <div className="modal-box  flex flex-col items-center space-y-4">
            <input type="text" placeholder={projectName} className="input input-bordered w-full max-w-xs" />
                <div className="flex flex-row space-x-4">
                    <button
                        className="btn  btn-primary btn-sm"
                        onClick={
                            async () => {
                                try {
                                    setRenamed(true)

                                    const renamedProject = await renameProject();
                                    setRenamed(false)

                                } catch (error) {
                                    console.log(error);
                                }

                            }
                        }
                        disabled={renamed}
                    >
                        {renamed&&(
                            <Spinner />
                        )}
                        {renamed?"renamed":"Rename"}
                    </button>
                    <button
                        className="btn btn-neutral btn-sm"
                        onClick={
                            () => {
                                const modalElement: any = document.getElementById('rename_proj')
                                modalElement.close()
                            }
                        }
                        disabled={renamed}
                    >
                        Cancel
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

export default RenameModal;