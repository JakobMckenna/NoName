import express from 'express';
import UserController from '../controller/user_controller';


const userRoutes = express.Router();

userRoutes.get("/projects/:id",UserController.projects);

userRoutes.post("/",UserController.createUser);

userRoutes.post("/auth", UserController.signIn);

userRoutes.delete("/:id",UserController.deleteUser);

userRoutes.get("/",UserController.getAll);

userRoutes.post("/verify",UserController.confirm)

export default userRoutes;