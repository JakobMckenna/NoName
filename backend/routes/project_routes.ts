import express from 'express';
import ProjectController from '../controller/project_controller';

const projectRoutes = express.Router();

projectRoutes.get("/",ProjectController.getAllProjects)

projectRoutes.post("/",ProjectController.createProject)

projectRoutes.delete("/:id",ProjectController.removeProject)


export default projectRoutes;