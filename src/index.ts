import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import errorHandler from './middlewares/error-handler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use('/api/v1', router);

//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
