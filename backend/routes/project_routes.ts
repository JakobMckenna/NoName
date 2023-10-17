import express from 'express';
import ProjectController from '../controller/project_controller';

const projectRoutes = express.Router();

projectRoutes.get("/",ProjectController.getAllProjects)

projectRoutes.get("/:id",ProjectController.getProject)


projectRoutes.get("/member/:id",ProjectController.getMembers)

projectRoutes.post("/",ProjectController.createProject)

projectRoutes.post("/member",ProjectController.addProjectMember)

projectRoutes.delete("/:id",ProjectController.removeProject)

projectRoutes.delete("/member",ProjectController.addProjectMember)

projectRoutes.post("/repo",ProjectController.addRepo);

projectRoutes.post("/sprint",ProjectController.createSprint)

projectRoutes.delete("/sprint/:id",ProjectController.removeSprint)

projectRoutes.get("/sprint/:id",ProjectController.getAllSprints)

export default projectRoutes;