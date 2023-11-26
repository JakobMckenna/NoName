/**
 * @fileoverview  Sprint Model retrieves , updates sprints/milestones info made by users
 */

import { PrismaClient } from '@prisma/client'


/**
 * Gets sprint/milestone info by ID
 * @param sprintID 
 * @returns  sprint/milestone object
 */
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

/**
 * Gets sprints of a project
 * @param projectID 
 * @returns  list of sprints of a project
 */
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

/**
 * Creates sprint/milestone
 * @param projectID 
 * @param name 
 * @param start 
 * @param deadline 
 * @returns  created sprint
 */
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

/**
 * Updates sprint/milestone infomation in the database
 * @param sprintID 
 * @param projectID 
 * @param name 
 * @param start 
 * @param deadline 
 * @returns  updated sprint/milestone
 */
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

/**
 * Removes sprint/milestone from the database
 * @param sprintID 
 * @returns  the deleted sprint/milestone object
 */
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
