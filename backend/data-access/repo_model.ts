
import { PrismaClient } from '@prisma/client'

// repo
export async function getRepo(projectID: string) {
    const prisma = new PrismaClient()
    try {

        const projects = await prisma.project.findUnique(
            {
                where: {
                    id: projectID,
                },
                include: {
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

export async function createRepo(projectID: string, owner: string, repo: string) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.githubProject.create(
            {
                data: {
                    projectID: projectID,
                    owner: owner,
                    repoName: repo,
                }
            }
        )

        return gitRepo;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }

}
;
export async function updateRepo(repoID :string ,projectID: string, owner: string, repo: string) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.githubProject.update(
            {
                where:{
                    id:repoID
                },
                data: {
                    projectID: projectID,
                    owner: owner,
                    repoName: repo,
                }
            }
        )

        return gitRepo;
    } catch (err: any) {
        console.log(err)
        return null;
    } finally {
        prisma.$disconnect()
    }
}
