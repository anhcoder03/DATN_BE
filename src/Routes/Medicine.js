import express from "express";
import {
  getAllMedicine,
  createMedicine,
  getOneMedicine,
  deleteMedicine,
  updateMedicine,
} from "../Controllers/Medicine.js";
const router = express.Router();
router.get("/medicines", getAllMedicine);
router.get("/medicines/:id", getOneMedicine);
router.post("/medicines", createMedicine);
router.delete("/medicines/:id", deleteMedicine);
router.put("/medicines/:id", updateMedicine);
export default router;
