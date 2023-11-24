import express from "express";
import {
  getAllMedicine,
  createMedicine,
  getOneMedicine,
  deleteMedicine,
  updateMedicine,
} from "../Controllers/Medicine.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth, sellerAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get("/medicines", authenticate, generalAuth, getAllMedicine);
router.get("/medicines/:id", authenticate, generalAuth, getOneMedicine);
router.post("/medicines", authenticate, sellerAuth, createMedicine);
router.delete("/medicines/:id", authenticate, sellerAuth, deleteMedicine);
router.put("/medicines/:id", authenticate, sellerAuth, updateMedicine);
export default router;
