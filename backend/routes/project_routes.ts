import express from 'express';
import ProjectController from '../controller/project_controller';

const projectRoutes = express.Router();

projectRoutes.get("/",ProjectController.getAllProjects)

projectRoutes.get("/member/:id",ProjectController.getMembers)

projectRoutes.post("/",ProjectController.createProject)

projectRoutes.post("/member",ProjectController.addProjectMember)

projectRoutes.delete("/:id",ProjectController.removeProject)


export default projectRoutes;