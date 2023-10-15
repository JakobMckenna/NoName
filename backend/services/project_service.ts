import { getAllProjects } from "../data-access/project_model"

const ProjectService = {
    getAllProjects: async () => {
        try {
            const projects = await getAllProjects();
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    }
}

export default ProjectService;