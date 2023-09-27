import express from 'express';
import { Request, Response } from 'express';
import UserController from '../controller/user_controller';
const userRoutes = express.Router();

userRoutes.get("/",UserController.getUser)

export default userRoutes;