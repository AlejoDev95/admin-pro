import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import { userRoute } from './routes';

import { connectDB, corsOption } from "./config";

dotenv.config();
const app = express();

connectDB();

app.use(cors(corsOption));
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});