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
    }
}

export default UserController;