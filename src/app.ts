import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import {
  authRoute,
  hospitalsRouter,
  userRoute,
  doctorRouter,
  searchRoute,
  uploadRouete,
} from "./routes";
import { connectDB, corsOption } from "./config";

dotenv.config();
const app = express();

connectDB();

app.use(cors(corsOption));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/doctors", doctorRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/users", userRoute);
app.use("/api/search", searchRoute);
app.use("/api/upload", uploadRouete);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
