import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.set('view engine', 'ejs');

dotenv.config();

const PORT = process.env.PORT || 5008;
const db =
  'mongodb+srv://admin:pass@cluster0.xva1z4o.mongodb.net/motosect?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then(() => {
    console.log('Connect to db');
  })
  .catch((error: Error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});

app.get('/api/', (_req: Request, res: Response, next: NextFunction) => {
  res.send('Working');
  next();
});

app.use(express.json());
