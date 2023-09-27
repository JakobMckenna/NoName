import { Request, Response } from 'express';

const UserController = {
    getUser:(req:Request,res:Response)=>{
        res.send('test: this is a user route ');
    }
}

export default UserController;