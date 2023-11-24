import express from "express";
import {
  addClinic,
  deleteClinic,
  getAllClinic,
  getOneClinic,
  updateClinic,
} from "../Controllers/Clinics.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";

const router = express.Router();
router.get("/clinic", authenticate, generalAuth, getAllClinic);
router.get("/clinic/:id", authenticate, generalAuth, getOneClinic);
router.post("/clinic", authenticate, generalAuth, addClinic);
router.delete("/clinic/:id", authenticate, generalAuth, deleteClinic);
router.put("/clinic/:id", authenticate, generalAuth, updateClinic);
export default router;
