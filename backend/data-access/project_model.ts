import { PrismaClient } from '@prisma/client'


export async function createProject(name:string ,userID :number) {
    const prisma = new PrismaClient()
    try {

        const project = await prisma.project.create(
            {
                data:{
                    name:name,
                    userId:userID,
                   
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
                            task:true
                        },
                    },
                    github:true,
                    members:true,
                    
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

    
        const members = await prisma.projectMember.findFirst(
            {
                where:{
                 project:{
                    id:projectID
                 },
             
                },
               
            }
        )
            
        if(members){
           const result = await prisma.projectMember.update(
                {
                    where:{
                        id:members.id
                    },
                    data:{
                        user:{
                            connect:{
                                id:userId
                            }
                        }
                    },
                    include:{
                        user:true
                    }
                }
            )
         return result;
        }else{
            await prisma.projectMember.create(
                {
                    data:{
                        projectID:projectID
                    }
                }
            )
            addProjectMember(projectID,userId)
        }

       // return members;
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

        const members = await prisma.projectMember.findFirst(
            {
                where: {
                    project: {
                        id: projectID
                    },
                },
                include: {
                    user: true,
                    project:true
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
     console.log(projectID)
    const prisma = new PrismaClient()
    try {
        let result = null;
        const members = await prisma.projectMember.findFirst(
            {
                where:{
                 project:{
                    id:projectID
                 },
                 user:{
                    some:{
                        id:userID
                    }
                 }
                },
               
            }
        )

        if(members){
           result = await prisma.projectMember.update(
                {
                    where:{
                        id:members.id
                    },
                    data:{
                        user:{
                            disconnect:{
                                id:userID
                            }
                        }
                    },
                    include:{
                        user:true
                    }
                }
            )
        }
        console.log(members)
        return {userID:userID ,projectID:projectID ,members:result?.user};
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}



