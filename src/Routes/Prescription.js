import { Router } from "express";
import {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getOnePrescription,
  updatePrescription,
} from "../Controllers/Prescription.js";
import authenticate from "../Middlewares/authenticate.js";
import { doctorAuth, generalAuth } from "../Middlewares/authorization.js";

const router = Router();
router.get("/prescriptions", authenticate, generalAuth, getAllPrescription);
router.post("/prescriptions", authenticate, doctorAuth, createPrescription);
router.get("/prescriptions/:id", authenticate, generalAuth, getOnePrescription);
router.put("/prescriptions/:id", authenticate, doctorAuth, updatePrescription);
router.delete(
  "/prescriptions/:id",
  authenticate,
  generalAuth,
  deletePrescription
);

export default router;
