import express from 'express';
import ProjectController from '../controller/project_controller';

const projectRoutes = express.Router();

projectRoutes.get("/",ProjectController.getAllProjects)

export default projectRoutes;