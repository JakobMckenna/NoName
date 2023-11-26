/**
 * @fileoverview github service this communicates with the github api
 */

import axios from 'axios';


const GIT_TOKEN = process.env.GIT_TOKEN; // git authorization token

const hourBeforeTime = () => {
    let result: Date;
    const currentDate: Date = new Date()
    const HOUR_IN_MS: number = 3600000
    result = new Date(currentDate.getTime() - HOUR_IN_MS)
    return result;
}

/**
 * GithubService is an object literal that handles github business logic
 */
const GithubService = {

    /**
     * getMainCommits gets commits from main branch
     * @param owner github user name  of the owner of the repo 
     * @param repoName name of the github repo
     * @returns  commits from the  main branch of github repository
     */
    getMainCommits: async (owner: string, repoName: string) => {
        let result: any = null;
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/commits`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },


    /**
     * getBranchCommits 
     * gets commits from a particular branch
     * @param owner name of owner of the github repository
     * @param repoName name of github repository
     * @param branchName name of github  branch 
     * @returns  commits from a specified branch of github repository
     */
    getBranchCommits: async (owner: string, repoName: string, branchName: string) => {
        let result: any = null;
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/commits?sha=${branchName}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },


    /**
     * getLatestCommits
     * gets a specified branch's  commits made in the past hour
     * @param owner name of owner of the github repository
     * @param repoName name of github repository
     * @param branchName branchName name of github  branch 
     * @returns   commits from a specified branch of github repository made in the past hour
     */
    getLatestCommits: async (owner: string, repoName: string, branchName: string) => {
        let result: any = null;
        const currentDate: Date = new Date()
        const HOUR_IN_MS: number = 3600000
        const timeStamp: Date = new Date(currentDate.getTime() - HOUR_IN_MS)

        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/commits?sha=${branchName}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                },
                params: {
                    since: timeStamp,
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },


    /**
     * getAllBranches
     * get all branches in a github repository
     * @param owner name of owner of the github repository
     * @param repoName name of github repository
     * @returns  a list of branches
     */
    getAllBranches: async (owner: string, repoName: string) => {
        let result: any = null;
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/branches`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },

    /**
     * getAllIssues
     * gets all open issues in github repository
     * @param owner  name of owner of the github repository
     * @param repoName name of github repository
     * @returns  list of all issues
     */
    getAllIssues: async (owner: string, repoName: string) => {
        let result: any = null;
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/issues`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },

    /**
     * getLatestClosedIssues
     * gets all closed issues , closed in the past hour
     * @param owner github user name 
     * @param repoName name of the github repo
     * @returns  a list of all issues closed in the past hour
     */
    getLatestClosedIssues: async (owner: string, repoName: string) => {
        let result: any = null;
        const timeStamp: Date = hourBeforeTime();
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/issues`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                },
                params: {
                    since: timeStamp,
                    state: 'closed'
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    },

    /**
     * getPullRequests
     * gets all open pull requests
     * @param owner github user name 
     * @param repoName name of the github repo
     * @returns  a list of pull requests
     */
    getPullRequests: async (owner: string, repoName: string) => {
        let result: any = null;
        try {
            const url: string = `https://api.github.com/repos/${owner}/${repoName}/pulls`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${GIT_TOKEN}`
                }
            });
            result = response.data;


        } catch (error) {
            console.log(error);
        } finally {
            return result;
        }
    }
}

export default GithubService;