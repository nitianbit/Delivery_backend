import { Router } from "express";
const router = Router();

import { createOrder, deleteOrder, updateOrderStatus, getOrderList, getSingleOrder } from "../controllers/orderContoller.js";

router.post('/create', createOrder);

router.delete('/delete/:id', deleteOrder);

router.put('/update/:id/status', updateOrderStatus);
router.get("/get/:id", getSingleOrder);

router.get('/get', getOrderList);

export default router; 