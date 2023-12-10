/**
 * @fileoverview project controller handles http requests and responds to 
 * clients with user projects related requests
 */
import { Request, Response } from 'express';
import ProjectService from '../services/project_service';
import GithubService from '../services/github_service';
import ChatService from '../services/chat_service';


const ProjectController = {

    /**
     * getProject
     * get project by project id from request url params
     * @param req  
     * @param res 
     */
    getProject: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.id;
            const projects = await ProjectService.getProject(projectID);
            if (projects === null) {
                res.status(400).json({ "projects": null });
            }
            res.status(200).json({ "projects": projects });

        } catch (error) {
            res.status(400).json()
        }


    },

    /**
     * createProject
     * creates a project from a json request body
     * @param req 
     * @param res 
     */
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

    /**
     * removProject
     * removes project by ID from req url params
     * @param req 
     * @param res 
     */
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

    /**
     * getAllProjects
     * gets all projects in the database
     * @param req 
     * @param res 
     */
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

    /**
     * addProjectMember
     * adds a user to a project from a json request body
     * @param req 
     * @param res 
     */
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

    /**
     * getMembers
     * gets members of a project by projectID from url request params
     * @param req 
     * @param res 
     */
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

    /**
     * removeMember
     * removes a user from a project by userID and project ID
     * by using url request params
     * @param req 
     * @param res 
     */
    removeMember: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.project;
            const userID: string = req.params.user;
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

    /**
     * addRepo
     * adds or updates github repository infomation to a project from a
     * json request body
     * @param req 
     * @param res 
     */
    addRepo: async (req: Request, res: Response) => {
        try {
            const repoBody = req.body;
            const repoID: string = repoBody.repoID;
            const projectID: string = repoBody.projectID;
            const owner: string = repoBody.owner;
            const repoName: string = repoBody.repoName;

            const isRepoValid = await GithubService.isValidRepo(owner, repoName)

            if (isRepoValid) {
                const repo = await ProjectService.addRepo(repoID, projectID, owner, repoName)
                res.status(200).json({ "github": repo });
            } else {
                res.status(404).json({ "github": null })
            }

        } catch (error) {
            res.status(400).json()
        }
    },

    /**
     * createSprint
     * adds sprint to a project from a request json body
     * @param req 
     * @param res 
     */
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

    /**
     * removeSprint
     * removes a sprint from a project by sprint ID
     * @param req 
     * @param res 
     */
    removeSprint: async (req: Request, res: Response) => {
        try {
            const sprintID: string = req.params.id;

            const sprint = await ProjectService.removeSprint(sprintID)
            res.status(200).json({ "sprint": sprint });

        } catch (error) {
            res.status(400).json()
        }
    },
    
    /**
     * getAllSprints
     * gets all sprints of a project by project ID  from request url params
     * @param req 
     * @param res 
     */
    getAllSprints: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.id;

            const sprints = await ProjectService.getAllSprints(projectID)
            res.status(200).json({ "sprints": sprints });

        } catch (error) {
            res.status(400).json()
        }
    },

    /**
     * getPrevMessages
     * gets previous messages from a project chat from request url params
     * @param req 
     * @param res 
     */
    getPrevMessages: async (req: Request, res: Response) => {
        try {
            const projectID: string = req.params.id;
            const result = await ChatService.getAll(projectID);
            res.status(200).json({ "messages": result })
        } catch (error) {
            res.status(400).json({ "messages": null })
        }
    }

}

export default ProjectController;