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
                where:{
                    id:projectID,
                },
                include: {
                    github:true,
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

        const projects = await prisma.githubProject.create(
           {
            data:{
                projectID:projectID,
                owner:owner,
                repoName:repo,
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

export async function createProjectTasks(userID: number, name: string, details: string, deadline: string) {

}

export async function getMembers(projectID: string) {

}

export async function getResearchNotes(projectID: string) {


}

export async function getSprints(projectID: string) {


}

