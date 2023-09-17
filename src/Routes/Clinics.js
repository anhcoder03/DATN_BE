import express from "express";
import {
  addClinic,
  deleteClinic,
  getAllClinic,
  getOneClinic,
  updateClinic,
} from "../Controllers/Clinics.js";

const router = express.Router();
router.get("/clinic", getAllClinic);
router.get("/clinic/:id", getOneClinic);
router.post("/clinic", addClinic);
router.delete("/clinic/:id", deleteClinic);
router.put("/clinic/:id", updateClinic);
export default router;
