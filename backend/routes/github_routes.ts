import express from "express";
import GithubController from "../controller/github_controller";

const githubRoutes = express.Router();

githubRoutes.get("/commits/:owner/:repo" ,GithubController.getCommits);

export default githubRoutes;