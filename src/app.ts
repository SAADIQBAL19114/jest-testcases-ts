import express, { Express } from 'express';
import userRouter from './routes/user';
import postRouter from './routes/post';

const app: Express = express();
app.use(express.json());

// routers defining

app.use('/user', userRouter);
app.use('/post', postRouter);


export default app;
