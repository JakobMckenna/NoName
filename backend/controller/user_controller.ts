import { Request, Response } from 'express';
import UserService from '../services/user_service';

const UserController = {
    getUser:(req:Request,res:Response)=>{
        const userData = UserService.getUser()
        res.send(userData);
    },

    createUser:(req:Request,res:Response)=>{
        const user = UserService.createUser()
        res.send(user)
    }
}

export default UserController;