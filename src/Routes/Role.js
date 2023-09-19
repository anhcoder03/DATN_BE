import express from "express";
import {
  addRole,
  deleteRole,
  getAllRole,
  getOneRole,
  getUserByName,
  updateRole,
} from "../Controllers/Role.js";

const router = express.Router();
router.get("/role", getAllRole);
router.get("/role/:id", getOneRole);
router.post("/role", addRole);
router.delete("/role/:id", deleteRole);
router.put("/role/:id", updateRole);
router.get("/rol", getUserByName);
export default router;
