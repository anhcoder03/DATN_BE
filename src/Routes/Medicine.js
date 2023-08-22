import express from "express";
import {getAllMedicine, createMedicine, getOneMedicine, deleteMedicine, updateMedicine} from "../Controllers/Medicine.js";
const router = express.Router();
router.get("/medicine", getAllMedicine);
router.get("/medicine/:id", getOneMedicine);
router.post("/medicine", createMedicine);
router.delete("/medicine/:id", deleteMedicine);
router.put("/medicine/:id", updateMedicine);
export default router;
