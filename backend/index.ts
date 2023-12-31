import http from "http"
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import {Server, Socket} from "socket.io"
import userRoutes from './routes/user_routes';
import cors from 'cors';
import githubRoutes from './routes/github_routes';
import projectRoutes from './routes/project_routes';
import Chat from "./sockets/chat";


dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
};
app.use(cors(corsOptions));

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:[ "http://frontend:3000", "http://localhost:3000" ]
  }
});

const port = 5001;



app.use(express.json());
app.use('/users', userRoutes);
app.use('/github', githubRoutes);
app.use('/projects', projectRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


const chatSocket = new Chat(io)
console.log(chatSocket.rooms())

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
