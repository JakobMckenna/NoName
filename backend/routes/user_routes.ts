/**
 * @fileoverview http user routes api routes 
 */

import express from 'express';
import UserController from '../controller/user_controller';


const userRoutes = express.Router();

/**
 * Http get /user
 * gets all users
 */
userRoutes.get("/",UserController.getAll);


/**
 * Http post /user
 * post user to the database
 */
userRoutes.post("/",UserController.createUser);

/**
 * Http delete /user/:id
 * deletes a user
 */
userRoutes.delete("/:id",UserController.deleteUser);


/**
 * Http get /user/project/:id
 * gets all projects a user is a member of with userID as url query param
 */
userRoutes.get("/projects/:id",UserController.projects);


/**
 * Http post /user/auth
 * authenticates user
 */
userRoutes.post("/auth", UserController.signIn);

/**
 * Http post /user/verify
 * verifies user is in the system
 */
userRoutes.post("/verify",UserController.confirm)

export default userRoutes;