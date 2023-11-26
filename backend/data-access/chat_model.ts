/**
 * @fileoverview chat model interacts with chats in the database including all message from sockets
 */


import { PrismaClient } from '@prisma/client'

/**
 * gets all messages from a project room
 * @param projectID each room has the same as its project ID
 * @returns a list object of messages
 */
export async function getAllMessages(projectID:string) {
    const prisma = new PrismaClient()
    const currentTime = new Date()
    try {

        const messages= await prisma.chat.findMany(
            {
                where:{
                    projectID:projectID,
                    timestamp:{
                        lt: currentTime
                    }
                },
                include:{
                    user:true
                },
            }
        );

        return messages;
    } catch (err: any) {
        console.log(err);
        return null;
    } finally {
        prisma.$disconnect();
    }
}

/**
 * Saves messages from socket to the database 
 * @param message  the message of the user
 * @param projectID the project room the message was sent to
 * @param userID the user who sent the message
 * @returns an object of the save message
 */
export async function saveMessage(message:string ,projectID:string, userID: number) {
    const prisma = new PrismaClient()
    try {

        const savedMessage = await prisma.chat.create(
            {
                data:{
                    message:message,
                    projectID:projectID,
                    userID:userID
                }
            }
        )

        return savedMessage;
    } catch (err: any) {
        console.log(err);
        return null;
    } finally {
        prisma.$disconnect();
    }
}

/**
 * deletes a message in the database 
 * @param messageID  the ID of the message in the database
 * @returns deleted message object
 */
export async function deleteMessage(messageID:string) {
    const prisma = new PrismaClient()
    try {

        const deletedMessage= await prisma.chat.delete(
            {
                where:{
                    id:messageID
                }
            }
        )

        return deletedMessage;
    } catch (err: any) {
        console.log(err);
        return null;
    } finally {
        prisma.$disconnect();
    }
}