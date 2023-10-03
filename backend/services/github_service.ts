import axios from 'axios';


const apiKey = process.env.GIT_TOKEN;

const GithubService = {

    getComits: (owner: string , repoName:string)=>{
        const url: string = `https://api.github.com/repos/${owner}/${repoName}/commits`;


    },
}