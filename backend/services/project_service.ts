import { addProjectMember, createProject, getAllProjects, getProject, getProjectMembers, removeProject, removeProjectMember, updateProject } from "../data-access/project_model"
import { createRepo, getRepo, updateRepo } from "../data-access/repo_model";
import { createSprint, getSprint, getSprints, removeSprint, updateSprint } from "../data-access/sprint_model";

const ProjectService = {
    getAllProjects: async () => {
        try {
            const projects = await getAllProjects();
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    },
    getProject: async (projectID:string) => {
        try {
            const projects = await getProject(projectID);
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    },
    /*
        createProject
        creates project and if project already exists it updates the project

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
                    const addProjectManager = await addProjectMember(projects.id, userID)
                    console.log(addProjectManager)
                }
                results = projects
            } else {
                const projects = await updateProject(id, name, userID);
                results = projects
            }

            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
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
    addMember: async (projectID: string, userID: number) => {
        try {
            let results = null;
            const addProjectMem = await addProjectMember(projectID, userID)
            results = addProjectMem;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
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
    removeMember: async (projectID: string, userID: number) => {
        try {
            let results = null;
            const removedMember = await removeProjectMember(projectID, userID)
            results = removedMember;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
    //returns repo info
    addRepo:async (repoID:string,projectID: string, owner: string, repo: string)=>{
        try {
            let results = null;
           
            let exists = null;
            if (projectID!= null)
                exists = await getRepo(repoID)
            if (exists === null)
            {
                const projRepo = await createRepo(projectID, owner,repo)
                results = projRepo;
            }else{
                const projRepo = await updateRepo(exists.id,projectID, owner,repo)
                results = projRepo;
            }
            return results;
        } catch (error) {
            throw new Error("failed to add new repo data");
        }
    },
    createSprint:async (sprintID:string,projectID: string, name: string, start: string, deadline: string)=>{
        try {
            let results = null;
           
            let exists = null;
            if (projectID!= null)
                exists = await getSprint(sprintID)
            if (exists === null)
            {
                const sprint = await createSprint(projectID, name,start,deadline)
                results = sprint;
            }else{
                const sprint = await updateSprint(exists.id,projectID, name,start,deadline)
                results = sprint;
            }
            return results;
        } catch (error) {
            throw new Error("failed to add new sprint");
        }
    },
    removeSprint: async (sprintID:string) => {
        try {
            let results = null;
            const removedSprint = await removeSprint(sprintID)
            results = removedSprint;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
    getAllSprints:async (projectID:string)=>{
        try {
            const sprints = await getSprints(projectID);
            return sprints;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    }
}

export default ProjectService;