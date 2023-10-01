import { Request, Response } from 'express';
import UserService from '../services/user_service';

const UserController = {
    getUser:(req:Request,res:Response)=>{
        const userData = UserService.getUser()
        res.send(userData);
    },

    createUser:async (req:Request,res:Response)=>{
        const userBody = req.body;
       // console.log(userBody)
        const name:string = userBody.name;
        const email:string = userBody.email;
        const password:string = userBody.password;
       // console.log(password)
        const user = await UserService.createUser(email , name, password)
        if(user)
            res.status(201).json({"success":user})
        else{
            res.status(400).json({"success":user})
        }
    }
}

export default UserController;