import express, { Express } from 'express';
import {db} from './src/models';
import userRouter from './src/routes/user';
import postRouter from './src/routes/post';

const app: Express = express();
app.use(express.json());

// routers defining

app.use('/user', userRouter);
app.use('/post', postRouter);


// ---------Listen Function---------
app.listen(2000, async () => {
  console.log("The server is running at http://localhost:2000");
  try {
    await db.sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
