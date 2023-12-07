/* eslint-disable */

import React, { useState } from "react";
import axios from "axios";
import config from 'config';
import Spinner from "./modal_spinner";

const DeleteUserModal = ({ userID, home }: { userID: string, home: () => void }) => {
  const [deleting, setDeleting] = useState(false);

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${config.backendApiUrl}/users/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('deleted user', response.data);
  
      // Close the modal after successful deletion
      const modalElement: any = document.getElementById('delete_user_modal');
      modalElement.close();
  
      // Handle successful deletion, e.g., redirect to home
      home();
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <dialog id="delete_user_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure you want to delete your account?</h3>
        <div className="flex flex-row justify-around">
        <button
            className="btn btn-danger btn-lg"
            onClick={async () => {
                try {
                setDeleting(true);
                await deleteUser();
                } catch (error) {
                console.log(error);
                }
            }}
            disabled={deleting}
        >
            {deleting && <Spinner />}
            {deleting ? "Deleting" : "Yes"}
        </button>
          <button
            className="btn btn-neutral btn-lg"
            onClick={() => {
              const modalElement: any = document.getElementById('delete_user_modal');
              modalElement.close();
            }}
            disabled={deleting}
          >
            No
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => {
          const modalElement: any = document.getElementById('delete_user_modal');
          modalElement.close();
        }}>
          Close
        </button>
      </form>
    </dialog>
  );
}

export default DeleteUserModal;
