import { PrismaClient } from '@prisma/client'

// Sprints

export async function getSprint(sprintID:string) {
    const prisma = new PrismaClient()
    try {

        const sprints = await prisma.sprint.findFirst(
            {
                where: {
                    id: sprintID,
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

export async function getSprints(projectID: string) {
    console.log("get all sprints")
    const prisma = new PrismaClient()
    try {

        const sprints = await prisma.sprint.findMany(
            {
                where: {
                    projectID: projectID,
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

        const sprint = await prisma.sprint.create(
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

        return sprint;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

export async function updateSprint(sprintID :string,projectID: string, name: string, start: string, deadline: string) {
    const prisma = new PrismaClient()
    try {

        const sprint = await prisma.sprint.update(
            {
                where:{
                    id:sprintID
                },
                data: {
                    projectID: projectID,
                    name: name,
                    start: start,
                    deadline: deadline,
                    // assignedTo: assignedUser

                }
            }
        )

        return sprint;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}


export async function removeSprint(sprintID: string) {
    const prisma = new PrismaClient()
    try {

        const sprint = await prisma.sprint.delete(
            {
                where:{
                    id:sprintID
                },
              
            }
        )

        return sprint;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}
