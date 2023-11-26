/**
 * @fileoverview User Model interacts with the database and returns user
 * related data
 */

import { PrismaClient } from '@prisma/client'



/**
 * Gets all users
 * @returns  all users
 */
export async function getAllUsers() {
    const prisma = new PrismaClient()
    try {
        console.log("find all users")
        const users = await prisma.user.findMany();
        console.log(users);
        //  prisma.$disconnect()
        return users;
    } catch (err: any) {
        console.log(err)
        return null;
    }
}


/**
 * Creates user password data
 * @param name 
 * @param email 
 * @param password 
 * @returns  user object
 */
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


/**
 * Gets user password , gets the user password based on email
 * @param userEmail 
 * @returns  
 */
export async function getUserPassword(userEmail: string) {
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
    } finally {
        prisma.$disconnect()
    }
}



/**
 * Deletes user by id
 * @param userID this the ID of the user you want to delete
 * @returns  user object
 */
export async function deleteUserByID(userID: number) {
    const prisma = new PrismaClient();
    try {

        const user = await prisma.user.delete({
            where: {
                id: userID
            }
        })

        console.log(`Deleted user\n${user}`)
        if (user != null) {
            console.log("user doesnt exist")
            throw new Error("user does not exist")
        }
        return user;
    } catch (err: any) {
        console.log(err)
        //throw(error)
        //  throw new Error ()
        return null;
    } finally {
        prisma.$disconnect()
    }

}


/**
 * Gets projects user is a member of
 * @param userID 
 * @returns  a list of projects a user is a member of
 */
export async function getUserProjects(userID: number) {
    const prisma = new PrismaClient()
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userID
            },
            include: {
                project: {
                    include: {
                        github: true,
                        sprint: true,
                        user: true
                    }
                },
                member: {
                    include: {
                        project: {

                            include: {
                                members: true,
                                user: true
                            },
                        },
                    },

                }
            }
        });


        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}


/**
 * Updates user info 
 * @param userID 
 * @param name 
 * @param email 
 * @param password 
 * @returns  user objecy
 */
export async function updateUser(userID: number, name: string, email: string, password: string) {
    const prisma = new PrismaClient()
    try {

        const user = await prisma.user.update(
            {
                where: {
                    id: userID
                },
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
        // console.log(user)

        return user;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        // clean up prisma client object
        prisma.$disconnect()
    }
}