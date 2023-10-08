import { Router } from "express";
import {
  createStaff,
  deleteStaff,
  getAllStaff,
  getOneStaff,
  updateStaff,
} from "../Controllers/Staff.js";
const router = Router();
router.get("/staffs", getAllStaff);
router.post("/staffs", createStaff);
router.get("/staffs/:id", getOneStaff);
router.put("/staffs/:id", updateStaff);
router.delete("/staffs/:id", deleteStaff);

export default router;
