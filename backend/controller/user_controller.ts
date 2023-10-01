import { Request, Response } from 'express';
import UserService from '../services/user_service';

const UserController = {
    getUser: (req: Request, res: Response) => {
        const userData = UserService.getUser()
        res.send(userData);
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