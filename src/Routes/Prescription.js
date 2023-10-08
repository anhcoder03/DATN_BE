import { Router } from "express";
import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getAllPrescriptionDetail,
  getOnePrescription,
  getOnePrescriptionDetail,
  updatePrescription,
} from "../Controllers/Prescription.js";

const router = Router();
router.get("/prescriptions", getAllPrescription);
router.post("/prescriptions", createPrescription);
router.get("/prescriptions/:id", getOnePrescription);
router.put("/prescriptions/:id", updatePrescription);
router.delete("/prescriptions/:id", deletePrescription);
router.get("/prescription-details", getAllPrescriptionDetail);
router.get("/prescription-details/:prescriptionId", getOnePrescriptionDetail);

export default router;
