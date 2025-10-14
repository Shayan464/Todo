import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connectDB();

app.use("/api", userRouter);
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
