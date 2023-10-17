import { PrismaClient } from '@prisma/client'


export async function createProject(name:string ,userID :number) {
    const prisma = new PrismaClient()
    try {

        const project = await prisma.project.create(
            {
                data:{
                    name:name,
                    userId:userID
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

export async function getProject(projectID:string,) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.findFirst(
            {
                where:{
                    id:projectID
                },
                include:{
                    sprint:{
                        include:{
                            note:{
                                include:{
                                    link:true,
                                },
                            },
                        },
                    },
                    github:true,
                    members:{
                        include:{
                            user:true
                        },
                    },
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

export async function updateProject(projectID:string,name:string ,userID :number) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.update(
            {
                where:{
                    id:projectID
                },
                data:{
                    name:name,
                    userId:userID
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

export async function removeProject(projectID:string,) {
    const prisma = new PrismaClient()
    try {
        const project = await prisma.project.delete(
            {
                where:{
                    id:projectID
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


// Project Members

export async function addProjectMember(projectID: string, userId: number) {
    const prisma = new PrismaClient()
    try {

    

        const user = await prisma.user.findFirst(
            {
                where:{
                    id:userId
                }
            }
        )
            
        const members = await prisma.projectMember.create(
            {
                data:{
                    user:{
                        connect:{
                            id:user?.id
                        }
                    },
                    projectID: projectID

                }
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

export async function getProjectMembers(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const members = await prisma.projectMember.findMany(
            {
                where: {
                    project: {
                        id: projectID
                    },
                },
                include: {
                    user: true
                }
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

export async function removeProjectMember(projectID: string, userID: number) {
    const prisma = new PrismaClient()
    try {

        const members = await prisma.projectMember.deleteMany(
            {
                where: {
                    project: {
                        id: projectID,
                        user: {
                            id: userID,
                        },
                    },


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



