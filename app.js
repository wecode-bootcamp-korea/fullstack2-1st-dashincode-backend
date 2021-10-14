import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { authMiddleware } from './middlewares/auth';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(authMiddleware());
app.use(cookieParser());
app.use('/', router);
app.use((err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
});
app.use(cors());

export default app;
