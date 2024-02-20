import { Router } from 'express';
const router = Router();

import { getDriverDetails, updateSingleDriver, getSingleDriverDetails, addSingleDriver, deleteSingleDriver} from "../controllers/driverController.js";
router.get("/get", getDriverDetails);

router.post("/add", addSingleDriver);

router.get("/get/:id", getSingleDriverDetails);

router.put("/update/:id", updateSingleDriver);

router.delete("/delete/:id", deleteSingleDriver);

export default router;