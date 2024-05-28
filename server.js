import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';

const app = express();

// import morgan from "morgan";
import mongoose from "mongoose";

import fieldRouter from './routers/fieldRouter.js'
import formRouter from './routers/formRouter.js'


app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.send("hello world");
});


app.use("/api", fieldRouter);
app.use("/api", formRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});


const port = process.env.PORT || 5200;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
