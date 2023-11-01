import express from "express";
import {
  createMedicalExaminationSlip,
  deleteExamination,
  getAllExamination,
  getOne,
  updateExamination,
} from "../Controllers/MedicalExaminationSlip.js";
const router = express.Router();
router.get("/medicalExaminationSlip", getAllExamination);
router.get("/medicalExaminationSlip/:id", getOne);
router.post("/medicalExaminationSlip", createMedicalExaminationSlip);
router.delete("/medicalExaminationSlip/:id", deleteExamination);
router.put("/medicalExaminationSlip/:id", updateExamination);

export default router;
