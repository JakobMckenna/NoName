import express from 'express';
import { Request, Response } from 'express';
import UserController from '../controller/user_controller';
const userRoutes = express.Router();

userRoutes.post("/",UserController.createUser)

userRoutes.post("/auth", UserController.signIn)

export default userRoutes;