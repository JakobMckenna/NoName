import { url } from "inspector";
import { createResearchNote ,deleteResearchNote, updateResearchNote } from "../data-access/research_model";
import { Url } from "../interfaces/interfaces";

const NoteService = {

    create:async (title: string, details: string, userID: number, sprint: string, urlList: Url[])=>{
        try{
            let result = null;
            const addedNote = await createResearchNote(title,details,userID,sprint,urlList);
            result = addedNote;
            return result;
        }catch(error){
            throw new Error("faield to create note")
        }
        
    },
    delete:async (noteID:string) => {
        try{
            let result = null;
            const deletedNote = await deleteResearchNote(noteID);
            result = deletedNote;
            return result;
        }catch(error){
            throw new Error("faield to create note")
        }
    },
    update:async (noteID: string, title: string, details: string, userID: number, sprint: string, urlList: Url[]) => {
        try{
            let result = null;
            const deletedNote = await updateResearchNote(noteID,title,details,userID,sprint,urlList);
            result = deletedNote;
            return result;
        }catch(error){
            throw new Error("faield to create note")
        }
    }

}


export default NoteService;