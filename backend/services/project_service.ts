import { addProjectMember, createProject, getAllProjects, getProject, removeProject, updateProject } from "../data-access/project_model"

const ProjectService = {
    getAllProjects: async () => {
        try {
            const projects = await getAllProjects();
            return projects;
        } catch (error) {
            throw new Error("failed to get projects");
        }

    },
    /*
        createProject
        creates project and if project already exists it updates the project

    */
    createProject:async (id:string ,name:string ,userID :number) => {
        try {
            let results = null;
            let exists = null;
            if (id != null)
                 exists = await getProject(id)
            if(exists === null)
            {
                const projects = await createProject(name,userID);
                if(projects)
                {
                    const addProjectManager = await addProjectMember(projects.id,userID)
                    console.log(addProjectManager)
                }
                results = projects
            }else{
                const projects = await updateProject(id, name,userID);
                results = projects
            }
                
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
    removeProject:async (id:string ) => {
        try {
            let results = null;
            const removedProject = await removeProject(id);
            results = removedProject;
            return results;
        } catch (error) {
            throw new Error("failed to get projects");
        }
    },
    
}

export default ProjectService;