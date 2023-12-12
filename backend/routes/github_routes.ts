/**
 * @fileoverview All github related routes on our rest api
 */

import express from "express";
import GithubController from "../controller/github_controller";

const githubRoutes = express.Router();

/**
 * Http get /github/branches/:owner/:repo
 * gets all branches available on a github repoistory 
 */
githubRoutes.get("/branches/:owner/:repo" ,GithubController.getAllBranches);

/**
 * Http get /github/commits/:owner/:repo
 * Gets commits of main branch on github repository
 */
githubRoutes.get("/commits/:owner/:repo" ,GithubController.getMainCommits);

/**
 * Http get /github/commits/:owner/:repo
 * Gets commits of a particular branch from github repository
 */
githubRoutes.get("/commits/branch/:owner/:repo/:branch" ,GithubController.getBranchCommits);


/**
 * Http get /github/latestcommits/commits/:owner/:repo
 * Gets latest commits of a particular branch from github repo from the past hour
 */
githubRoutes.get("/latestcommits/:owner/:repo/:branch" ,GithubController.getLatestCommits);


/**
 * Http get /github/latestcommits/commits/:owner/:repo
 * Gets all issues of  github repo
 */
githubRoutes.get("/issues/:owner/:repo" ,GithubController.getAllIssues);


/**
 * Http get /github/closedissues/commits/:owner/:repo
 * Gets all issues closed within the past hour on a github repo
 */
githubRoutes.get("/closedissues/:owner/:repo" ,GithubController.getClosedIssues);


/**
 * Http get /github/pulls/:owner/:repo
 * Gets all pull request within the past hour on a github repo
 */
githubRoutes.get("/pulls/:owner/:repo" ,GithubController.getAllPullRequest);

export default githubRoutes;