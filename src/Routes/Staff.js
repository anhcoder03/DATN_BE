import { Router } from "express";
import { createStaff, updateStaff } from "../Controllers/Staff.js";
const router = Router();
router.post("/staffs", createStaff);
router.put("/staffs/:id", updateStaff);

export default router;
