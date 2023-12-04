import express from "express";
import {
  createMedicalExaminationSlip,
  deleteExamination,
  getAllExamination,
  getOne,
  updateExamination,
} from "../Controllers/MedicalExaminationSlip.js";
import authenticate from "../Middlewares/authenticate.js";
import { adminAuth, generalAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get(
  "/medicalExaminationSlip",
  authenticate,
  generalAuth,
  getAllExamination
);
router.get("/medicalExaminationSlip/:id", getOne);
router.post(
  "/medicalExaminationSlip",
  authenticate,
  createMedicalExaminationSlip
);
router.delete(
  "/medicalExaminationSlip/:id",
  authenticate,
  adminAuth,
  deleteExamination
);
router.put("/medicalExaminationSlip/:id", authenticate, updateExamination);

export default router;
