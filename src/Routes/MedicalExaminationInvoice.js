import { Router } from "express";
import {
  createMedicalExaminationInvoice,
  deleteMedicalExaminationInvoice,
  getAllMedicalExaminationInvoice,
  getOneMedicalExaminationInvoice,
  updateMedicalExaminationInvoice,
} from "../Controllers/MedicalExaminationInvoice.js";
const router = Router();
router.get("/medicalExaminationInvoices", getAllMedicalExaminationInvoice);
router.get("/medicalExaminationInvoices/:id", getOneMedicalExaminationInvoice);
router.post("/medicalExaminationInvoices", createMedicalExaminationInvoice);
router.put("/medicalExaminationInvoices/:id", updateMedicalExaminationInvoice);
router.delete(
  "/medicalExaminationInvoices/:id",
  deleteMedicalExaminationInvoice
);
export default router;
