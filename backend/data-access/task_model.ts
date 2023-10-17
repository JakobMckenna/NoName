import { PrismaClient } from '@prisma/client'


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

