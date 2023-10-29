import { PrismaClient } from '@prisma/client'

export async function getAllMessages(projectID:string) {
    const prisma = new PrismaClient()
    try {

        const messages= await prisma.chat.findMany(
            {
                where:{
                    projectID:projectID
                }
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