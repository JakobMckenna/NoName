import { Request, Response } from 'express';
import ProjectService from '../services/project_service';

const ProjectController = {
    getAllProjects: async (req: Request, res: Response) => {
        try {

            const projects = await ProjectService.getAllProjects();
            if(projects === null){
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });
        } catch (error) {
            res.status(400).json()
        }
    }
}

export default ProjectController;