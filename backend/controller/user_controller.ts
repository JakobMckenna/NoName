import { Request, Response } from 'express';
import UserService from '../services/user_service';

const UserController = {
    signIn: async (req: Request, res: Response) => {
        const userBody = req.body;
        const email: string = userBody.email;
        const password: string = userBody.password;

        const userData = await UserService.signIn(email, password);
        if (userData) {
            // user password is correct
            res.status(200).json({ user: userData });
        } else {
            // user password does not match or user does not exist
            res.status(400).json({ "message": "failed" })
        }

    },

    createUser: async (req: Request, res: Response) => {
        console.log(req)
        const userBody = req.body;
        const name: string = userBody.name;
        const email: string = userBody.email;
        const password: string = userBody.password;

        const user = await UserService.createUser(email, name, password);
        if (user) {
            // returns user object if successfully create
            res.status(201).json({ "user": user })
        }
        else {
            // returns null user object if user exists already or failed for some other reason
            res.status(400).json({ "user": user })
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        try {
            const userID = req.params.id;
            const userIdNum = parseInt(userID);
            if (isNaN(userIdNum)){
                res.status(400).json({ "user": null ,message:"query string should be number"});
            }
            const user = await UserService.deleteUser(userIdNum);
            if(user === null){
                res.status(404).json({ "user": user });
            }
            res.status(200).json({ "user": user });
        } catch (error) {
            res.status(400).json({ "user": null});
        }
    },
    projects:async (req: Request, res: Response) => {
        try {
            const userID = req.params.id;
            const userIdNum = parseInt(userID);
            if (isNaN(userIdNum)){
                res.status(400).json({ "user": null ,message:"query string should be number"});
            }
            const user = await UserService.getProjects(userIdNum);
            if(user === null){
                res.status(404).json({ "user": user });
            }
            res.status(200).json({ "user": user });
        } catch (error) {
            res.status(400).json({ "user": null});
        }
    },
    getAll:async(req:Request , res:Response)=>{
        try{
            const users = await UserService.getAll();
            res.status(200).json({"users":users});

        }catch(error){
            res.status(400).json({"users":null});
        }
    },
    confirm:async(req:Request , res:Response)=>{
        try{
            const userID = req.params.id;
            const users: any[] = await UserService.getAll();
            const index = users.findIndex((user)=>user.id == userID);
            res.status(200).json({"users":!(index==-1)});

        }catch(error){
            res.status(400).json({"users":null});
        }
    },
}

export default UserController;