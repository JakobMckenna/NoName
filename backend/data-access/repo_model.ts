/**
 * @fileoverview  Repo model retirieves and updates the github infomation in the database
 */
import { PrismaClient } from '@prisma/client'

/**
 * Gets github repository object
 * @param projectID project ID of github repository you want to retrieve
 * @returns  github repository infomation object
 */
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

/**
 * Creates github repository record in the database
 * @param projectID 
 * @param owner name of the owner of the github repoistory
 * @param repo name of the github repository
 * @returns  created repo object
 */
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

/**
 * Updates github repository infomation in the database
 * @param repoID 
 * @param projectID 
 * @param owner 
 * @param repo 
 * @returns  updated github repository object
 */
export async function updateRepo(repoID :string ,projectID: string, owner: string, repo: string) {
    const prisma = new PrismaClient()
    try {

        const gitRepo = await prisma.githubProject.update(
            {
                where:{
                    id:repoID
                },
                data: {
                  //  projectID: projectID,
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
