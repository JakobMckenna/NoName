/**
 * @fileoverview project service this handle the business logic of project
 */
import { addProjectMember, createProject, getAllProjects, getProject, getProjectMembers, removeProject, removeProjectMember, updateProject } from "../data-access/project_model"
import { createRepo, getRepo, updateRepo } from "../data-access/repo_model";
import { createSprint, getSprint, getSprints, removeSprint, updateSprint } from "../data-access/sprint_model";

const ProjectService = {
    /**
     * getAllProjects
     * get all projects in the database
     * @returns  a list of all project
     */
    getAllProjects: async () => {
        try {
            const projects = await getAllProjects();
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    },

    /**
     * getProject 
     * gets project by project ID
     * @param projectID 
     * @returns  a project object
     */
    getProject: async (projectID: string) => {
        try {
            const project = await getProject(projectID);
            return project;
        } catch (error) {
            throw new Error("failed to get project");
        }

    },

    /**
     * createProject 
     * this creates a user project
     * @param id is the id of an existing project if  a user wants to modify project data
     * @param name is the name of the project
     * @param userID is the owner of a project
     * @returns  created project
     */
    createProject: async (id: string, name: string, userID: number) => {
        try {
            let results = null;
            let exists = null;
            if (id != null)
                exists = await getProject(id)
            if (exists === null) {
                const projects = await createProject(name, userID);
                if (projects) {
                    const addProjectManager = await addProjectMember(projects.id, userID);
                    console.log(addProjectManager);
                }
                results = projects;
            } else {
                const projects = await updateProject(id, name, userID);
                results = projects;
            }

            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * removeProject 
     * removes a user project based on the project id
     * @param id is the ID of the project you want to delete
     * @returns  deleted project
     */
    removeProject: async (id: string) => {
        try {
            let results = null;
            const removedProject = await removeProject(id);
            results = removedProject;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * addMember
     * add a user by ID to a project
     * @param projectID , the project a user is being added to
     * @param userID , is the ID of the user being added to a project
     * @returns  a list of current members + the new one
     */
    addMember: async (projectID: string, userID: number) => {
        try {
            let results = null;
            const addProjectMemember = await addProjectMember(projectID, userID);
            results = addProjectMemember;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * getMembers
     * gets the current members of a project
     * @param projectID is the project members being requested 
     * @returns  a list of current project members
     */
    getMembers: async (projectID: string) => {
        try {
            let results = null;
            const members = await getProjectMembers(projectID)
            results = members;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * removeMember
     * this removes a user from a project
     * @param projectID is the project you want to remove a user from
     * @param userID is the user you want to remove
     * @returns  updated member list
     */
    removeMember: async (projectID: string, userID: number) => {
        try {
            let results = null;
            const removedMember = await removeProjectMember(projectID, userID);
            results = removedMember;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * addRepo
     * adds github repository infomation to the database
     * @param repoID , is the ID of the repo in the database if you want update the github repository
     * @param projectID , is the project you want to add github information fo
     * @param owner is the owner of the github repository
     * @param repo is the name of the repository
     * @returns  
     */
    addRepo: async (repoID: string, projectID: string, owner: string, repo: string) => {
        try {
            let results = null;

            let exists = null;
            if (repoID != null) {
                exists = await getRepo(projectID);

            }
            if (exists === null) {
                const projRepo = await createRepo(projectID, owner, repo);
                results = projRepo;
            } else {
                const projRepo = await updateRepo(repoID, projectID, owner, repo)
                results = projRepo;
            }
            return results;
        } catch (error) {
            throw new Error("failed to add new repo data");
        }
    },

    /**
     * createSprint
     * This creates sprint/milestone of a project
     * @param sprintID is the ID of the sprint in the database if you want update the sprint 
     * @param projectID is the project you want to add a sprint for
     * @param name is the name of the sprint
     * @param start is the start date of sprint
     * @param deadline is the deadline of a sprint
     * @returns  created/updated sprint
     */
    createSprint: async (sprintID: string, projectID: string, name: string, start: string, deadline: string) => {
        try {
            let results = null;

            let exists = null;
            if (sprintID != null)
                exists = await getSprint(sprintID);
            if (exists === null) {
                const sprint = await createSprint(projectID, name, start, deadline);
                results = sprint;
            } else {
                const sprint = await updateSprint(sprintID, projectID, name, start, deadline);
                results = sprint;
            }
            return results;
        } catch (error) {
            throw new Error("failed to add new sprint");
        }
    },

    /**
     * removeSprint
     * removes sprint from a project
     * @param sprintID  is the sprint you want to remove
     * @returns  deleted sprint
     */
    removeSprint: async (sprintID: string) => {
        try {
            let results = null;
            const removedSprint = await removeSprint(sprintID)
            results = removedSprint;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },

    /**
     * getAllSprints
     * returns all sprints of a project
     * @param projectID is the ID of the project you want sprint for
     * @returns  a list of sprints
     */
    getAllSprints: async (projectID: string) => {
        try {
            const sprints = await getSprints(projectID);
            return sprints;
        } catch (error) {
            throw new Error("failed to get sprints");
        }
    },

};

export default ProjectService;