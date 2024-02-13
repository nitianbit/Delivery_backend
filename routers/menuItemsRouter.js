import { Router } from "express";
const router = Router();

import { createMenuItems, getAllMenuItems, getSingleMenuItem, updateSingleMenuItem, deleteMenuItem } from "../controllers/menuItemsController.js";

router.post("/create", createMenuItems);

router.get("/get", getAllMenuItems);

router.get("/get/:id", getSingleMenuItem);

router.put("/update/:id", updateSingleMenuItem);

router.delete("/delete/:id", deleteMenuItem);

export default router;