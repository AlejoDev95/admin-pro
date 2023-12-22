import express from "express";
import { connectDB } from "./database";
// alejoDev95 qBdVIwc62gTpHhDR
const app = express();
app.use(express.json());

connectDB();

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.status(400).json({ ok: true, msg: "Hellow World" });
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
