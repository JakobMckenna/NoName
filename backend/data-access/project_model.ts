import { PrismaClient } from '@prisma/client'



export async function getAllProjects() {
    const prisma = new PrismaClient()
    try {

        const user = await prisma.project.findMany(
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

        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}
export async function getRepo(projectID: string) {

}


export async function createRepo(projectID: string, owner: string, repo: string) {

}

export async function createProjectTasks(userID: number, name: string, details: string, deadline: string) {

}

export async function getMembers(projectID: string) {

}

export async function getResearchNotes(projectID: string) {


}

export async function getSprints(projectID: string) {


}

