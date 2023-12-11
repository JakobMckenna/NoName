/**
 * @fileoverview notes service this handle the business logic of notes
 */


import { createResearchNote, deleteResearchNote, getResearchNotes, updateResearchNote } from "../data-access/research_model";

interface Url {
    url: string
};

const NotesService = {
    /**
     * create
     * creates research note/bookmark
     * @param title 
     * @param details 
     * @param userID 
     * @param sprint 
     * @param urlList 
     * @returns  research note/bookmark object
     */
    create: async (title: string, details: string, userID: number, sprint: string, urlList: Url[]) => {
        try {
            let result = null;
            const addedNote = await createResearchNote(title, details, userID, sprint, urlList);
            result = addedNote;
            return result;
        } catch (error) {
            throw new Error("faield to create note")
        }

    },
    /**
     * delete
     * deletes note by ID
     * @param noteID 
     * @returns  deleted research note/bookmark object
     */
    delete: async (noteID: string) => {
        try {
            let result = null;
            const deletedNote = await deleteResearchNote(noteID);
            result = deletedNote;
            return result;
        } catch (error) {
            throw new Error("faield to create note")
        }
    },
    /**
     * update  updates the note 
     * @param noteID 
     * @param title 
     * @param details 
     * @param userID 
     * @param sprint 
     * @param urlList 
     * @returns  updated research note/bookmark
     */
    update: async (noteID: string, title: string, details: string, userID: number, sprint: string, urlList: any) => {
        try {
            let result = null;
            const updateNote = await updateResearchNote(noteID, title, details, userID, sprint, urlList);
            result = updateNote;
            return result;
        } catch (error) {
            throw new Error("faield to create note")
        }
    },
    /**
     * getAll 
     * gets all research notes/bookmarks of a particular project
     * @param projectID 
     * @returns  a list of notes
     */
    getAll: async (projectID: string) => {
        try {
            let result = null;
            const allNotes = await getResearchNotes(projectID);
            result = allNotes;
            return result;
        } catch (error) {
            throw new Error("faield to create note")
        }
    }

};


export default NotesService;