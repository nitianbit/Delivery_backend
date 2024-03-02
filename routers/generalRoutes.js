import { Router } from "express";
import { getPincodes } from "../controllers/generalController.js";
const generalRouter = Router();


generalRouter.get("/pincodes", getPincodes);

export default generalRouter;
