import { Request, Response } from 'express';
import GithubService from '../services/github_service';

const GithubController = {
    getMainCommits: async (req: Request, res: Response) => {

        const owner: string = req.params.owner;
        const repoName: string = req.params.repo;

        const commits = await GithubService.getMainCommits(owner, repoName);

        if (commits) {
            // successfully got commits
            res.status(200).json({ commits: commits });
        } else {
            // failed to get commits
            res.status(400).json({ "message": "failed" })
        }

    },
    getBranchCommits: async (req: Request, res: Response) => {

        const owner: string = req.params.owner;
        const repoName: string = req.params.repo;
        const branchName: string = req.params.branch;
        const commits = await GithubService.getBranchCommits(owner, repoName,branchName);

        if (commits) {
            // successfully got commits
            res.status(200).json({ commits: commits });
        } else {
            // failed to get commits
            res.status(400).json({ "message": "failed" })
        }

    },
    getAllBranches: async (req: Request, res: Response)=>{
        const owner: string = req.params.owner;
        const repoName: string = req.params.repo;
        
        const branches = await GithubService.getAllBranches(owner, repoName);

        if (branches) {
            // successfully got branches
            res.status(200).json({ branches: branches });
        } else {
            // failed to get branches
            res.status(400).json({ "message": "failed" })
        }

    }
}


export default GithubController;