import { createProject, getAllProjects } from "../data-access/project_model"

const ProjectService = {
    getAllProjects: async () => {
        try {
            const projects = await getAllProjects();
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    },
    createProject:async (name:string ,userID :number) => {
        try {
            const projects = await createProject(name,userID);
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    }
    
}

export default ProjectService;