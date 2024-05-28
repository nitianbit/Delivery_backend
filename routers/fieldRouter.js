import { Router } from "express";
const router = Router();

import {
    addFields,
    getFields,
    getFieldById,
    editField,
    deleteField
} from "../controllers/FieldsController.js";

router.get("/getField", getFields);
router.post("/addField", addFields)
router.get('/fields/:id', getFieldById);
router.put('/fields/:id', editField);
router.delete('/fields/:id', deleteField);

export default router;
