/**
 * @fileoverview  Project model interacts with project data in the database which includes
 * project infomation and membes
 */

import { PrismaClient } from '@prisma/client'

/**
 * Creates project
 * @param name name of the project created
 * @param userID this is the UserID of the person who created the project
 * @returns  project created 
 */
export async function createProject(name: string, userID: number) {
    const prisma = new PrismaClient()
    try {

        const project = await prisma.project.create(
            {
                data: {
                    name: name,
                    userId: userID,

                }
            }
        )

        return project;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}

/**
 * Gets project by ID
 * @param projectID 
 * @returns  a project object
 */
export async function getProject(projectID: string,) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.findFirst(
            {
                where: {
                    id: projectID
                },
                include: {
                    sprint: {
                        include: {
                            note: {
                                include: {
                                    link: true,
                                },
                            },
                            task: true
                        },
                    },
                    github: true,
                    members: true,

                },

            }
        )

        return project;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Updates project info
 * @param projectID 
 * @param name 
 * @param userID 
 * @returns  update project object
 */
export async function updateProject(projectID: string, name: string, userID: number) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.update(
            {
                where: {
                    id: projectID
                },
                data: {
                    name: name,
                    userId: userID
                }
            }
        )

        return project;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}

/**
 * Removes project by project ID
 * @param projectID 
 * @returns  removed project object
 */
export async function removeProject(projectID: string,) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.delete(
            {
                where: {
                    id: projectID
                },

            }
        )

        return project;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Gets all projects in the database
 * @returns  a list of project object
 */
export async function getAllProjects() {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.findMany(
            {
                include: {
                    sprint: {
                        include: {
                            task: true
                        }
                    },
                    members: {
                        include: {
                            user: true,
                        }
                    },
                    github: true,
                }
            }
        )

        return projects;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}



/**
 * Adds project member
 * This is a recursive function to add members of a project 
 * @param projectID 
 * @param userId 
 * @returns  an object of the project ID and a list of the members of the project
 */
export async function addProjectMember(projectID: string, userId: number) {
    const prisma = new PrismaClient()
    try {

        let result = null;
        const members = await prisma.projectMember.findFirst(
            {
                where: {
                    project: {
                        id: projectID
                    },


                },
               

            }
        )

        if (members) {
            result = await prisma.projectMember.update(
                {
                    where: {
                        id: members.id
                    },
                    data: {
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    },
                    include: {
                        user: true
                    }
                }
            )
           return result;
        } else {
            await prisma.projectMember.create(
                {
                    data: {
                        projectID: projectID
                    }
                }
            )
            addProjectMember(projectID, userId)
        }
        console.log(members)
       // return result;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Gets project members
 * @param projectID 
 * @returns  a list of members of a project
 */
export async function getProjectMembers(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const members = await prisma.projectMember.findFirst(
            {
                where: {
                    project: {
                        id: projectID
                    },
                },
                include: {
                    user: true,
                    project: true
                },

            }
        )

        return members;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}

/**
 * Removes project member
 * @param projectID 
 * @param userID The id of the user being removed
 * @returns  an updated list of current project members excluding the removed user
 */
export async function removeProjectMember(projectID: string, userID: number) {
    console.log(projectID)
    const prisma = new PrismaClient()
    try {
        let result = null;
        const members = await prisma.projectMember.findFirst(
            {
                where: {
                    project: {
                        id: projectID
                    },
                    user: {
                        some: {
                            id: userID
                        }
                    }
                },

            }
        )

        if (members) {
            result = await prisma.projectMember.update(
                {
                    where: {
                        id: members.id
                    },
                    data: {
                        user: {
                            disconnect: {
                                id: userID
                            }
                        }
                    },
                    include: {
                        user: true
                    }
                }
            )
        }
        console.log(members)
        return { userID: userID, projectID: projectID, members: result?.user };
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}



