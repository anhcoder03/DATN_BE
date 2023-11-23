import { Router } from "express";
import {
  createMedicalExaminationInvoice,
  deleteMedicalExaminationInvoice,
  getAllMedicalExaminationInvoice,
  getOneMedicalExaminationInvoice,
  updateMedicalExaminationInvoice,
} from "../Controllers/MedicalExaminationInvoice.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";
const router = Router();
router.get(
  "/medicalExaminationInvoices",
  authenticate,
  generalAuth,
  getAllMedicalExaminationInvoice
);
router.get(
  "/medicalExaminationInvoices/:id",
  authenticate,
  generalAuth,
  getOneMedicalExaminationInvoice
);
router.post(
  "/medicalExaminationInvoices",
  authenticate,
  generalAuth,
  createMedicalExaminationInvoice
);
router.put(
  "/medicalExaminationInvoices/:id",
  authenticate,
  generalAuth,
  updateMedicalExaminationInvoice
);
router.delete(
  "/medicalExaminationInvoices/:id",
  deleteMedicalExaminationInvoice
);
export default router;
