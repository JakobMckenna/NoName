import express from "express";
import GithubController from "../controller/github_controller";

const githubRoutes = express.Router();

// Gets commits of main branch on github repo
githubRoutes.get("/commits/:owner/:repo" ,GithubController.getMainCommits);


export default githubRoutes;