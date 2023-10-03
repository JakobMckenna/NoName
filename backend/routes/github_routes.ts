import express from "express";
import GithubController from "../controller/github_controller";

const githubRoutes = express.Router();

githubRoutes.get("/comits" ,GithubController.getCommits);

export default githubRoutes;