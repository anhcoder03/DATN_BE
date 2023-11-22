import express from "express";
import {
  createMedicalExaminationSlip,
  deleteExamination,
  getAllExamination,
  getOne,
  updateExamination,
} from "../Controllers/MedicalExaminationSlip.js";
import authenticate from "../Middlewares/authenticate.js";
import { doctorAuth, generalAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get("/medicalExaminationSlip", authenticate, getAllExamination);
router.get("/medicalExaminationSlip/:id", authenticate, getOne);
router.post(
  "/medicalExaminationSlip",
  authenticate,
  generalAuth,
  createMedicalExaminationSlip
);
router.delete(
  "/medicalExaminationSlip/:id",
  authenticate,
  generalAuth,
  deleteExamination
);
router.put("/medicalExaminationSlip/:id", authenticate, updateExamination);

export default router;
