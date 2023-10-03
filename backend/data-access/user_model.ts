
import { PrismaClient } from '@prisma/client'


export async function createUserPasswordData(name: string, email: string, password: string) {
    const prisma = new PrismaClient()
    try {

        const user = await prisma.user.create(
            {
                data: {
                    email: email,
                    name: name,
                    userPassword: {
                        create: {
                            password: password
                        }
                    }
                },
            }
        );
        console.log(user)

        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        // clean up prisma client object
        prisma.$disconnect()
    }
}


export async function getUserPassword(userEmail: string, userPassword: string) {
    const prisma = new PrismaClient()
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
            include: {
                userPassword: true,
            }
        });
       
    
        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally{
        prisma.$disconnect()
    }
}