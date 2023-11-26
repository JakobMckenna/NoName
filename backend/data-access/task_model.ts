/**
 * @fileoverview  task Model retrieves , updates task info made by users
 */
import { PrismaClient } from '@prisma/client'

/**
 * Creates project task
 * @param sprintID 
 * @param name 
 * @param details 
 * @param deadline 
 * @param assignedUser 
 * @param authorUser 
 * @param completed 
 * @returns  task object
 */
export async function createProjectTask(sprintID: string, name: string, details: string, deadline: string, assignedUser: number, authorUser: number, completed: boolean) {
    const prisma = new PrismaClient()
    try {

        const tasks = await prisma.task.create(
            {
                data: {
                    sprintID: sprintID,
                    name: name,
                    details: details,
                    deadline: deadline,
                    assignedTo: assignedUser,
                    createdBy: authorUser,
                    completed: completed,
                    
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

/**
 * Gets project task
 * @param taskID 
 * @returns  task object
 */
export async function getProjectTask(taskID:string) {
    const prisma = new PrismaClient()
    try {

        const tasks = await prisma.task.findFirst(
            {
              where:{
                id:taskID
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

/**
 * Removes project task
 * @param taskID 
 * @returns  removed task object
 */
export async function removeProjectTask(taskID: string) {
    const prisma = new PrismaClient()
    try {

        const removedTask = await prisma.task.delete(
            {
                where: {
                    id: taskID,
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

/**
 * Updates project task
 * @param taskID 
 * @param sprintID 
 * @param name 
 * @param details 
 * @param deadline 
 * @param assignedUser 
 * @param authorUser 
 * @param completed 
 * @returns  updated task object
 */
export async function updateProjectTask(taskID: string, sprintID: string, name: string, details: string, deadline: string, assignedUser: number, authorUser: number, completed: boolean) {
    const prisma = new PrismaClient()
    try {

        const task = await prisma.task.update(
            {
                where: {
                    id: taskID,
                },
                data: {
                    sprintID: sprintID,
                    name: name,
                    details: details,
                    deadline: deadline,
                    assignedTo: assignedUser,
                    createdBy: authorUser,
                    completed: completed
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

