import axios from 'axios';


const GIT_TOKEN = process.env.GIT_TOKEN;


const GithubService = {

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