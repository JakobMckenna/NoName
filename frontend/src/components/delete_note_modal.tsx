/* eslint-disable */
import { useState } from "react";
import Spinner from "./modal_spinner";
import axios from "axios";
import config from "config";

const DeleteNote = ({id , remove}:{id:string , remove:any}) => {
    const [deleting, setDeleting] = useState(false);
    const deleteNote = async () => {
        try {
            const deletedNote = await axios.delete(`${config.backendApiUrl}/projects/notes/${id}`);
            //console.log(`deleted ${deletedNote}`);
            const note = deletedNote.data.notes;
            remove(note.id)
            return deleteNote;
            // refresh(true)
        } catch (error) {
            console.log(error);
        }

    };
    return ( 
        <dialog id="del_note" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure you want to delete this Note</h3>
            <div className="flex flex-row justify-around">
                <button
                    className="btn  btn-warning btn-lg"
                    onClick={
                        async () => {
                            try {
                                setDeleting(true)

                                const deletedProject = await deleteNote();
                                setDeleting(false)
                                const modalElement: any = document.getElementById('del_note')
                                modalElement.close()


                            } catch (error) {
                                console.log(error);
                                if(axios.isAxiosError(error)){
                                    if(error.response){
                                        ("item has already been deleted")
                                        remove(id)
                                    }
                                    remove(id)
                                }
                            }

                        }
                    }
                    disabled={deleting}
                >
                    {deleting&&(
                        <Spinner />
                    )}
                    {deleting?"deleting":"yes"}
                </button>
                <button
                    className="btn btn-neutral btn-lg"
                    onClick={
                        () => {
                            const modalElement: any = document.getElementById('del_note')
                            modalElement.close()
                        }
                    }
                    disabled={deleting}
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
 
export default DeleteNote;