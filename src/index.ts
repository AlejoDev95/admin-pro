import express from "express";
import { connectDB } from "./database";
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.status(400).json({ ok: true, msg: "Hellow World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
