import http from "http"
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import {Server, Socket} from "socket.io"
import userRoutes from './routes/user_routes';
import cors from 'cors';
import githubRoutes from './routes/github_routes';
import projectRoutes from './routes/project_routes';

dotenv.config();

const app: Express = express();

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:"http://localhost:3000"
  }
});

const port = 5001;


app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/github', githubRoutes);
app.use('/projects', projectRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



const chatNameSpace = io.of('chat');

chatNameSpace.on('connection', (socket) => {
  console.log('a user connected');


  socket.on('create',(room)=>{
    socket.join(room)
    console.log(`create room ${room}`)
  })

  socket.on('join',(room)=>{
    socket.join(room)
    console.log(`joined room ${room}`)
  })

  socket.on('leave',(room)=>{
    socket.leave(room)
    console.log(`left room ${room}`)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });

});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
