import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user_routes';
import cors from 'cors';
import githubRoutes from './routes/github_routes';
import projectRoutes from './routes/project_routes';

dotenv.config();

const app: Express = express();

const port = 5001;


app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/github',githubRoutes);
app.use('/projects',projectRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
