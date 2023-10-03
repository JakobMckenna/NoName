import axios from 'axios';


const GIT_TOKEN = process.env.GIT_TOKEN; // git authorization token


const GithubService = {


    // getMainCommits
    // get main branch  commits
    // owner - github user name , repoName - name of the github repo
    // returns list of commits or null if no commits or failed to retrieve github commits
    getMainCommits: async (owner: string, repoName: string) => {
        let result:any = null;
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
        }finally{
            return result;
        }


    },
}

export default GithubService;