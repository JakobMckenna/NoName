import { PrismaClient } from '@prisma/client'

interface Url{
    url:string
}

export async function getResearchNotes(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const notes = await prisma.researchNote.findMany(
            {
                where: {

                    sprint:{
                        project:{
                            id:projectID,
                        },
                    },
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

export async function createResearchNote(title: string, details: string, userID: number, sprint: string, urlList: Url[]) {
    const prisma = new PrismaClient()
    try {

        const notes = await prisma.researchNote.create(
            {
                data: {
                    sprintID: sprint,
                    title: title,
                    userID: userID,
                    details: details,
                    link: {
                        createMany: {
                            data: urlList
                        },
                    },
                  
                },

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

export async function updateResearchNote(noteID: string, title: string, details: string, userID: number, sprint: string, urlList: Url[]) {
    const prisma = new PrismaClient()
    try {

        const notes = await prisma.researchNote.update(
            {
                where: {
                    id: noteID
                },
                data: {
                    sprintID: sprint,
                    title: title,
                    userID: userID,
                    details: details,
                    link: {
                        createMany: {
                            data: urlList
                        },
                    }
                },

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


export async function deleteResearchNote(noteID: string) {
    const prisma = new PrismaClient()
    try {

        const notes = await prisma.researchNote.delete(
            {
                where: {
                    id: noteID
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