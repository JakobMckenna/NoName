import { Request, Response } from 'express';
import NotesService from '../services/notes_service';
const NotesController = {
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
    delete: async (req: Request, res: Response) => {
        try {
            const noteID: string = req.params.id;
            const notes = await NotesService.delete(noteID);
            res.status(200).json({ "notes": notes});

        } catch (error) {
            res.status(400).json()
        }
    },
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
            console.log(title)
            const notes = await NotesService.update(noteID,title,details,userID,sprintID,urlList)

            res.status(200).json({ "notes": notes});

        } catch (error) {
            res.status(400).json()
        }
    },
}

export default NotesController;