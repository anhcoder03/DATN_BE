import express from "express";
import {
  createMedicalExaminationSlip,
  getAllExamination,
  getOne,
} from "../Controllers/MedicalExaminationSlip.js";
const router = express.Router();
router.get("/medicalExaminationSlip", getAllExamination);
router.get("/medicalExaminationSlip/:id", getOne);
router.post("/medicalExaminationSlip", createMedicalExaminationSlip);
// router.delete("/medicalExaminationSlip/:id", deleteMedicine// router.put("/medicalExaminationSlip/:id", updateMedicine););

export default router;
