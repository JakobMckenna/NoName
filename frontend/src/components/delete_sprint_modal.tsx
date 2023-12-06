/* eslint-disable */
import { useState } from "react";
import Spinner from "./modal_spinner";

const SprintDelete = ({deleteSprint}:{deleteSprint:any}) => {
    const [deleting, setDeleting] = useState(false)
    return (
        <dialog id="del_sprint" className="modal">
        <div className="modal-box prose">
            <h3 className="font-bold text-lg">Are you sure you want to delete this Sprint!</h3>
            <p> Deleting this sprint will result in the removal of any associated research bookmarks</p>
            <div className="flex flex-row justify-around">
                <button
                    className="btn  btn-warning btn-lg"
                    onClick={
                        
                        async () => {
                            const modalElement: any = document.getElementById('del_sprint')
                            try {
                                setDeleting(true)

                                const deletedSprint = await deleteSprint();
                                setDeleting(false)
                               
                                modalElement.close()

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
                    {deleting?"delting":"yes"}
                </button>
                <button
                    className="btn btn-neutral btn-lg"
                    onClick={
                        () => {
                            const modalElement: any = document.getElementById('del_sprint')
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
 
export default  SprintDelete;