import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  updateUser,
  getDashboardDetails
} from "../controllers/userController.js";

router.get("/get", getCurrentUser);
router.get("/get/dashboard", getDashboardDetails);
router.put(
  "/update",
  updateUser
);
export default router;
