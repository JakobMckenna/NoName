/*
    github_routes.ts
    All github related routes on our rest api
*/

import express from "express";
import GithubController from "../controller/github_controller";

const githubRoutes = express.Router();

// gets all branches available on a github repo
githubRoutes.get("/branches/:owner/:repo" ,GithubController.getAllBranches);

// Gets commits of main branch on github repo
githubRoutes.get("/commits/:owner/:repo" ,GithubController.getMainCommits);

// Gets commits of a particular branch from github repo
githubRoutes.get("/commits/branch/:owner/:repo/:branch" ,GithubController.getBranchCommits);

// Gets latest commits of a particular branch from github repo from the past hour
githubRoutes.get("/latestcommits/:owner/:repo/:branch" ,GithubController.getLatestCommits);

// Gets all issues of  github repo
githubRoutes.get("/issues/:owner/:repo" ,GithubController.getAllIssues);

// Gets all issues closed within the past hour on a github repo
githubRoutes.get("/closedissues/:owner/:repo" ,GithubController.getClosedIssues);

// Gets all issues pull request within the past hour on a github repo
githubRoutes.get("/pulls/:owner/:repo" ,GithubController.getAllPullRequest);

export default githubRoutes;