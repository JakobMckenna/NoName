import { Request, Response } from 'express';
import ProjectService from '../services/project_service';

const ProjectController = {
    createProject: async (req: Request, res: Response) => {
        const projectBody = req.body;
        try {

            const projects = await ProjectService.createProject(projectBody.id, projectBody.name, projectBody.userID);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });
        } catch (error) {
            res.status(400).json();
        }

    },
    removeProject: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.id;
            const projects = await ProjectService.removeProject(projectID);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });

        } catch (error) {
            res.status(400).json()
        }


    },
    getAllProjects: async (req: Request, res: Response) => {
        try {

            const projects = await ProjectService.getAllProjects();
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });
        } catch (error) {
            res.status(400).json()
        }
    },
    addProjectMember:async (req: Request, res: Response) => {
        try {
            const memberBody = req.body;
            const projectID: string = memberBody.projectID;
            const userID: number= memberBody.userID;
            
          
            const projects = await ProjectService.addMember(projectID,userID);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });

        } catch (error) {
            res.status(400).json()
        }
    }


}

export default ProjectController;