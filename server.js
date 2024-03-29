import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';
import https from 'https'

const app = express();

// import morgan from "morgan";
import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cloudinary from "cloudinary";
// import { body, validationResult } from "express-validator";

//routers
import authRouter from "./routers/authRouter.js";
import menuItemsRouter from './routers/menuItemsRouter.js';
import userRouter from "./routers/userRouter.js";
import orderRouter from './routers/orderRouter.js'
import driverRouter from './routers/driverRouter.js'

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { pincodes } from "./utils/constants.js";


// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cors());

app.get("/api/", (req, res) => {
  res.send("hello world");
});

app.get("/api/version", (req, res) => {
  res.send("1.1");
});

app.post("/api", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});
app.get("/api/general/pincodes", (req, res) => {
  return res.json({
    data: pincodes,
    message: 'Pincodes',
    status: 200
  });
});
app.use("/api/users", authMiddleware, userRouter);
app.use("/api/menuItems", authMiddleware, menuItemsRouter);
app.use("/api/order", authMiddleware, orderRouter);
app.use("/api/auth", authRouter);
app.use("/api/driver", authMiddleware, driverRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
// });

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

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
