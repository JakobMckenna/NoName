import { createResearchNote } from "../data-access/research_model";

const NoteService = {

    create:async (title: string, details: string, userID: number, sprint: string, urlList: any)=>{
        try{
            let result = null;
            const addedNote = await createResearchNote(title,details,userID,sprint,urlList);
        }catch(error){

        }
        
    }

}


export default NoteService;