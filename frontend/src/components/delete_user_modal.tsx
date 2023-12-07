import React, { useState } from "react";
import axios from "axios";
import config from 'config';
import Spinner from "./modal_spinner";

const DeleteUserModal = ({ userID, home }: { userID: string, home: () => void }): JSX.Element => {
    const [deleting, setDeleting] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);

    console.log('Delete Modal Loaded, ID: ', userID);
    const closeModal = () => {
        console.log('Close Modal');
        const modalElement: any = document.getElementById('del_user')
        modalElement.close()
        setDeleting(false);
        setModalOpen(false);
    };

    //TODO: Bug that onlny lets you open the delete user modal once


    const deleteUser = async () => {
        try {
            const response = await axios.delete(`${config.backendApiUrl}/users/${userID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('deleted user', response.data);

            // Handle successful deletion, e.g., redirect to home
            home();
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error, e.g., show an error message
        } finally {
            // Close the modal after completion (whether success or failure)
            setModalOpen(false);
        }
    };

    return (
        <dialog open={modalOpen} id="del_user" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
                <h4 className="text-sm">This action cannot be undone.</h4>
                <div className="flex flex-row justify-around">
                    <button
                        className="btn btn-warning btn-lg m-5"
                        onClick={async () => {
                            try {
                                setDeleting(true);
                                await deleteUser();
                            } catch (error) {
                                console.log(error);
                            } finally {
                                setDeleting(false);
                            }
                        }}
                        disabled={deleting}
                    >
                        {deleting && <Spinner />}
                        {deleting ? "Deleting" : "Delete Account"}
                    </button>
                    <button
                        className="btn btn-neutral btn-lg m-5"
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        disabled={deleting}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div className="modal-backdrop">
                <button onClick={() => setModalOpen(false)}>Close</button>
            </div>
        </dialog>
    );
}


export default DeleteUserModal;
