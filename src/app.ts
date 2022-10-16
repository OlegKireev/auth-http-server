import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/db';
import { json } from 'express';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';

dotenv.config();

const { PORT, DB_HOST } = process.env;

const app = express();

const startServer = () => {
    try {
    db.connect(DB_HOST);    
    
    app.use(json());
    app.use('/auth' ,authRouter);
    app.use('/', userRouter);

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    })
  } catch (err) {
    console.warn(err);
  }
}

startServer();
