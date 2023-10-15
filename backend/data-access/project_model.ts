import { PrismaClient } from '@prisma/client'



export async function getAllProjects() {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.findMany(
            {
                include: {
                    task: true,
                    sprint: true,
                    members: {
                        include: {
                            user: true,
                        }
                    },
                    github: true
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

export async function createProjectTasks(projectID: string, name: string, details: string, deadline: string, assignedUser: number, authorUser: number) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.task.create(
            {
                data: {
                    projectID: projectID,
                    name: name,
                    details: details,
                    deadline: deadline,
                    createdBy: authorUser,
                    assignedTo: assignedUser

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

export async function getMembers(projectID: string) {

}

export async function getResearchNotes(projectID: string) {


}

export async function getSprints(projectID: string) {


}

export async function createSprint(params:type) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.sprint.create(
            {
                data: {
                    projectID: projectID,
                    name: name,
                    details: details,
                    deadline: deadline,
                    createdBy: authorUser,
                    assignedTo: assignedUser

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

