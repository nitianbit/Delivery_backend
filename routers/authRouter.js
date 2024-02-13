import { Router } from "express";
import { register, login } from "../controllers/authController.js";
const router = Router();

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
export default router;
