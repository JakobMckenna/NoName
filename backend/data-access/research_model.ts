/**
 * @fileoverview  Research Model retrieves , updates research info made by users
 */
import { PrismaClient } from '@prisma/client'

interface Url{
    url:string
}

/**
 * Gets research notes
 * @param projectID Project ID of the research Notes you want to get
 * @returns  list object of research notes of a particular poject
 */
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

/**
 * Creates research note
 * @param title 
 * @param details 
 * @param userID userID of user creating research note
 * @param sprint sprint/milestone the research was done in
 * @param urlList list of links/resources user found
 * @returns  note object
 */
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
                include:{
                    link:true
                }
            }
        );
        if(notes==null){
            throw new Error("invalid input was given")
        }

        return notes;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Updates research note
 * @param noteID 
 * @param title 
 * @param details 
 * @param userID 
 * @param sprint 
 * @param urlList 
 * @returns  updated note object
 */
export async function updateResearchNote(noteID: string, title: string, details: string, userID: number, sprint: string, urlList: any) {
    const prisma = new PrismaClient()
    try {
        console.log(urlList)
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
                    link:{
                        update:{
                            where:{
                                id:urlList.id
                            },
                            data:{
                                url:urlList.url
                            }
                        }
                    }
                    
                  
                    
                 
                },
                include:{
                    link:true
                }

            }
        )
        
        console.log(notes)
       
      

        return notes;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Deletes research note by note ID
 * @param noteID 
 * @returns  deleted research note
 */
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