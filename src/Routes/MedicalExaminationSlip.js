import express from "express";
import {
  createMedicalExaminationSlip,
  getAllMedicalExaminationSlip,
  getOne,
} from "../Controllers/MedicalExaminationSlip.js";
const router = express.Router();
router.get("/medicalExaminationSlip", getAllMedicalExaminationSlip);
router.get("/medicalExaminationSlip/:id", getOne);
router.post("/medicalExaminationSlip", createMedicalExaminationSlip);
// router.delete("/medicalExaminationSlip/:id", deleteMedicine);
// router.put("/medicalExaminationSlip/:id", updateMedicine);
export default router;
