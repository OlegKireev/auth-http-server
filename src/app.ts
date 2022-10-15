import express from 'express';
import dotenv from 'dotenv';
import { db } from './db/db';
import { authRouter } from './routes/auth';
import { json } from 'express';

dotenv.config();

const { PORT, DB_HOST } = process.env;

const app = express();

const startServer = () => {
    try {
    db.connect(DB_HOST);    
    
    app.use(json());
    app.use('/auth' ,authRouter);

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    })
  } catch (err) {
    console.warn(err);
  }
}

startServer();
