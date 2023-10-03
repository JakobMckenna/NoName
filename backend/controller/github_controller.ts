import { Request, Response } from 'express';
import GithubService from '../services/github_service';

const GithubController = {
    getCommits: async (req: Request, res: Response)=>{
      const body = req.body;
      const owner:string = body.owner;
      const repoName:string = body.name;

      const commits = await GithubService.getComits(owner , repoName);

      if (commits) {
        // successfully got commits
        res.status(200).json({ commits: commits });
    } else {
        // failed to get commits
        res.status(400).json({ "message": "failed" })
    }

    }
}


export default GithubController;