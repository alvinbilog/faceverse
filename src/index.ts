import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import connectDb from './configs/db.config';
import mongoose from 'mongoose';

dotenv.config();

connectDb();

const app: Express = express();
const port = process.env.PORT || 8000;

// body parser
app.use(express.json());

app.use(cors());

app.use('/api/v1', router);

//error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
