/**
 * @fileoverview notes controller handles http requests and responds to 
 * clients with note related request
 */
import { Request, Response } from 'express';
import NotesService from '../services/notes_service';
const NotesController = {

    /**
     * create
     * creates note/bookmark from a req json body
     * @param req 
     * @param res 
     * @returns http 200 and if it fails it returns http 400
     */
    create: async (req: Request, res: Response) => {
        const noteBody = req.body;
        try{
            const title:string = noteBody.title;
            const details:string = noteBody.details;
            const userID:number = noteBody.userID;
            const sprintID:string = noteBody.sprintID;
            const urlList = noteBody.urlList;

            const notes = await NotesService.create(title,details,userID,sprintID,urlList)

            res.status(200).json({"notes":notes});

        }catch(error){
            res.status(400).json()
        }
    },

    /**
     * delete
     * deletes notes by ID from a url request param
     * @param req 
     * @param res 
     * @returns http 200 and if it fails it returns http 400
     */
    delete: async (req: Request, res: Response) => {
        try {
            const noteID: string = req.params.id;
            const notes = await NotesService.delete(noteID);
            res.status(200).json({ "notes": notes});

        } catch (error) {
            res.status(400).json()
        }
    },
    /**
     * getAll
     * gets all notes in a project from a url request param
     * @param req 
     * @param res 
     * @returns http 200 and if it fails it returns http 400
     */
    getAll:async (req: Request, res: Response) => {
        console.log("get notes")
        try {
            const projectID: string = req.params.id;
            const notes = await NotesService.getAll(projectID);
            res.status(200).json({ "notes": notes});

        } catch (error) {
            res.status(400).json()
        }
    },
    /**
     * update
     * updates a note by note ID by json request body
     * @param req 
     * @param res 
     * @returns http 200 and if it fails it returns http 400
     */
    update:async (req: Request, res: Response) => {
        const noteBody = req.body;
        try {
            const noteID:string = noteBody.noteID;
            const title:string = noteBody.title;
            const details:string = noteBody.details;
            const userID:number = noteBody.userID;
            const sprintID:string = noteBody.sprintID;
            const urlList = noteBody.urlList;
            console.log("title")
            console.log(urlList)
            const notes = await NotesService.update(noteID,title,details,userID,sprintID,urlList)

            res.status(200).json({ "notes": notes});

        } catch (error) {
            res.status(400).json()
        }
    },
}

export default NotesController;