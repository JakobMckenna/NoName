import express from 'express';
import { Request, Response } from 'express';
import UserController from '../controller/user_controller';
const userRoutes = express.Router();

userRoutes.post("/",UserController.createUser)

export default userRoutes;