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
    addProjectMember: async (req: Request, res: Response) => {
        try {
            const memberBody = req.body;
            const projectID: string = memberBody.projectID;
            const userID: number = memberBody.userID;


            const projects = await ProjectService.addMember(projectID, userID);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });

        } catch (error) {
            res.status(400).json()
        }
    },
    getMembers: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.id;
            const members = await ProjectService.getMembers(projectID);
            if (members === null) {
                res.status(400).json({ "members": null });
            }
            res.status(200).json({ "members": members });

        } catch (error) {
            res.status(400).json()
        }
    },
    removeMember: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.projectID;
            const userID: string = req.params.userID;
            const userIdNum = parseInt(userID);
            if (isNaN(userIdNum)) {
                res.status(400).json({ "user": null, message: "query string should be number" });
            }
            const projects = await ProjectService.removeMember(projectID, userIdNum);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });

        } catch (error) {
            res.status(400).json()
        }

    },
    addRepo: async (req: Request, res: Response) => {
        try {
            const repoBody = req.body;
            const repoID: string = repoBody.repoID;
            const projectID: string = repoBody.projectID;
            const owner: string =repoBody.owner;
            const repoName: string = repoBody.repoName;
            const repo = await ProjectService.addRepo(repoID, projectID, owner, repoName)
            res.status(200).json({ "github": repo });

        } catch (error) {
            res.status(400).json()
        }
    },
    createSprint: async (req: Request, res: Response) => {
        try {
            const sprintBody = req.body;
            const sprintID: string = sprintBody.sprintID;
            const projectID: string = sprintBody.projectID;
            const name: string = sprintBody.name;
            const start: string = sprintBody.start;
            const deadline: string = sprintBody.deadline;

            const sprint = await ProjectService.createSprint(sprintID, projectID, name, start, deadline)
            res.status(200).json({ "sprint": sprint });

        } catch (error) {
            res.status(400).json()
        }
    },
    removeSprint: async (req: Request, res: Response) => {
        try {
            const sprintID: string = req.params.sprintID;

            const sprint = await ProjectService.removeSprint(sprintID)
            res.status(200).json({ "sprint": sprint });

        } catch (error) {
            res.status(400).json()
        }
    },
    // get all sprint of all a project
    getAllSprints: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.projectID;

            const sprints = await ProjectService.getAllSprints(projectID)
            res.status(200).json({ "sprints": sprints });

        } catch (error) {
            res.status(400).json()
        }
    },
    addTask: async (req: Request, res: Response) => {
        try {
            const taskBody = req.body;
            const taskID: string = taskBody.taskID;
            const sprintID: string = taskBody.sprintID;

            const details: string = taskBody.details;
            const name: string = taskBody.name;
            const assignedUser: number = taskBody.assignedUser;
            const authorUser: number = taskBody.projectID;
            const deadline: string = taskBody.deadline;
            const completed: boolean = taskBody.completed;

           

            const addedTask = await ProjectService.addTask(taskID, sprintID, name, details, deadline, assignedUser, authorUser, completed)
            res.status(200).json({ "task": addedTask  });

        } catch (error) {
            res.status(400).json()
        }
    },
    remove: async (req: Request, res: Response) => {
        try {
            const taskID: string = req.params.taskID;

            const removedTask = await ProjectService.removeTask(taskID)
            res.status(200).json({ "sprints": removedTask });

        } catch (error) {
            res.status(400).json()
        }
    },

}

export default ProjectController;