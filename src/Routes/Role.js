import express from "express";
import {
  addRole,
  deleteRole,
  getAllRole,
  getOneRole,
  getUserByName,
  updateRole,
} from "../Controllers/Role.js";
import authenticate from "../Middlewares/authenticate.js";
import { adminAuth } from "../Middlewares/authorization.js";

const router = express.Router();
router.get("/role", authenticate, adminAuth, getAllRole);
router.get("/role/:id", authenticate, adminAuth, getOneRole);
router.post("/role", authenticate, adminAuth, addRole);
router.delete("/role/:id", authenticate, adminAuth, deleteRole);
router.put("/role/:id", authenticate, adminAuth, updateRole);
router.get("/rol", authenticate, getUserByName);
export default router;
