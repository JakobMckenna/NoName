import { PrismaClient } from '@prisma/client'

export async function getAllProjects() {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.findMany(
            {
                include: {
                    sprint: {
                        include:{
                            task:true
                        }
                    },
                    members: {
                        include: {
                            user: true,
                        }
                    },
                    github: true,
                }
            }
        )

        return projects;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}
export async function getRepo(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.findUnique(
            {
                where: {
                    id: projectID,
                },
                include: {
                    github: true,
                }
            }
        )

        return projects;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}

export async function createRepo(projectID: string, owner: string, repo: string) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.githubProject.create(
            {
                data: {
                    projectID: projectID,
                    owner: owner,
                    repoName: repo,
                }
            }
        )

        return gitRepo;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}



// Project tasks
export async function createProjectTasks(sprintID: string , name: string, details: string, deadline: string, assignedUser: number, authorUser: number,completed:boolean) {
    const prisma = new PrismaClient()
    try {

        const tasks = await prisma.task.create(
            {
                data:{
                    sprintID:sprintID,
                    name:name,
                    details:details,
                    deadline:deadline,
                    assignedTo:assignedUser,
                    createdBy:authorUser,
                    completed:completed
                }
            }
        )

        return tasks;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}

export async function removeProjectTask(taskID:string) {
    const prisma = new PrismaClient()
    try {

        const removedTask = await prisma.task.delete(
            {
               where:{
                id:taskID,
               },
            }
        )

        return removedTask;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function updateProjectTask(taskID :string,sprintID: string , name: string, details: string, deadline: string, assignedUser: number, authorUser: number,completed:boolean) {
    const prisma = new PrismaClient()
    try {

        const task = await prisma.task.update(
            {
                where:{
                    id:taskID,
                },
                data:{
                    sprintID:sprintID,
                    name:name,
                    details:details,
                    deadline:deadline,
                    assignedTo:assignedUser,
                    createdBy:authorUser,
                    completed:completed
                }
            }
        )

        return task;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}


// Project Members

export async function addProjectMember(projectID: string, userId: number) {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.update(
            {
                where:{
                    id:projectID,
                },
                data: {
                    members:{
                        create:[
                            {
                                id:userId
                            }
                        ]
                    },

                },

            },
        )


        return projects;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function getMembers(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const members = await prisma.projectMember.findMany(
            {
                where: {
                  project:{
                    id:projectID
                  },
                },
                include: {
                    user: true
                }
            }
        )

        return members;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function removeMember(projectID: string ,userID: string) {
    const prisma = new PrismaClient()
    try {

        const members = await prisma.projectMember.delete(
            {
                where: {
                    id: projectID,

                },
                include: {
                    user: true
                }
            }
        )

        return members;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function getResearchNotes(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const notes = await prisma.researchNote.findMany(
            {
                where: {
                    id: projectID,
                },
                include: {
                    link: true
                }
            }
        )

        return notes;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}


// Sprints

export async function getSprints(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const sprints = await prisma.sprint.findMany(
            {
                where: {
                    id: projectID,
                },

            }
        )

        return sprints;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}

export async function createSprint(projectID: string, name: string, start: string, deadline: string) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.sprint.create(
            {
                data: {
                    projectID: projectID,
                    name: name,
                    start: start,
                    deadline: deadline,
                    // assignedTo: assignedUser

                }
            }
        )

        return gitRepo;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function removeSprint(sprintID: string) {
    
}