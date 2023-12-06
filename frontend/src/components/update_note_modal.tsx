/* eslint-disable */
import axios from "axios";
import { useForm } from "react-hook-form";

import config from "config";
import Spinner from "./modal_spinner";
import FormAlert from "./form_alert";
import { useEffect } from "react";

function Form({ id, note, projectID, userID, sprints, update }: { id: string, note: any, projectID: string, userID: string, sprints: any, update: any}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm();

  const webLink = note?.link[0].url;

  const handleUpdateNote = async (data: any) => {

    try {

      const response = await axios.patch(`${config.backendApiUrl}/projects/notes`,
        {
          noteID: id,
          title: data.title == "" ? note?.title : data.title,
          details: data.details == "" ? note?.details : data.details,
          projectID: projectID,
          userID: userID,
          sprintID: data.sprint,
          urlList: { id: note?.link[0]?.id, url: data.url == "" ? note.link.url : data.url }
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('added Notes', response.data);
      //const note = response.data.notes
      if (response.data.notes == null) {
        console.log("bad input")
        setError("notes",
          {
            type: "server",
            message: `Bad input, details or Title might be too long`
          }
        )
        throw new Error("")
        //return null

      }
      const updatedNote = response.data.notes
      update(updatedNote)

      // refresh(true);
      const modalElement: any = document.getElementById('update_note')
      modalElement.close()

    } catch (error) {
      if (axios.isAxiosError(error)) {

        //console.log(error.response.status);
        //  console.log(error.response.data);
        if (error.response) {
          setError("notes",
            {
              type: "server",
              message: `failed . Details or Title might be too long`
            }


          )
        } else {
          setError("notes",
            {
              type: "server",
              message: `Bad input`
            }


          )
        }
      }
      //setAdding(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateNote)} >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Sprint</span>
        </label>
        <select defaultValue={note?.sprintID}  {...register("sprint")} className="select select-bordered w-full max-w-xs" onChange={() => clearErrors("notes")} disabled={isSubmitting} required>
          {
            sprints && sprints.map((sprint: any) => {
              return (
                <option key={sprint.id} value={sprint.id} selected={note?.sprintID == sprint.id}>{sprint.name}</option>
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
          defaultValue={note?.title}
          {...register("title")}

          type="text"
          placeholder="title"
          className="input input-bordered"
          onChange={() => clearErrors("notes")}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Details</span>
        </label>
        <textarea
          defaultValue={note?.details}
          {...register("details")}
          placeholder="type the main things you learnt"

          className="textarea textarea-bordered"
          onChange={() => clearErrors("notes")}
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
          defaultValue={webLink}
          placeholder="url"
          className="input input-bordered"
          onChange={() => clearErrors("notes")}
          disabled={isSubmitting}
          required
        />
      </div>

      {errors.notes && (<div className="mt-6"><FormAlert message={String(errors.notes.message)} /></div>)}
      <div className="form-control mt-6">
        <button
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <Spinner />
          )}
          {isSubmitting ? "Updating Note" : "UpdateNote"}
        </button>

      </div>
    </form>
  )
}





const UpdateNote = ({ noteID, note, projectID, userID, sprints, update }: { noteID: string, note: any, projectID: string, userID: string, sprints: any, update: any }) => {
  useEffect(() => { }, [note])
  return (
    <dialog id="update_note" className="modal">
      <div className="modal-box">
        <h2 className="font-bold text-2lg uppercase">Update Note</h2>
        <Form
          id={noteID}
          note={note}
          projectID={projectID}
          userID={userID}
          sprints={sprints}
          update={update}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default UpdateNote;