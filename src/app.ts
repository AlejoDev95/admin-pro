import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";

import { connectDB, corsOption } from "./config";

dotenv.config();
const app = express();

connectDB();

app.use(cors(corsOption));
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.status(400).json({ ok: true, msg: "Hellow World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
