import { Router } from "express";
const router = Router();

import {
    addForm,
    getForm,
    editForm,
    getFormById
} from "../controllers/FormsController.js";

router.get("/getForm", getForm);
router.post("/addForm", addForm);
router.get('/getForm/:id', getFormById);
router.put('/editForm/:id', editForm);

export default router;
