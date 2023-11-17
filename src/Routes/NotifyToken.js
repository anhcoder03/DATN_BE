import express from "express";
import { createNotifyToken } from "../Controllers/NotifyToken.js";

const router = express.Router();
router.post("/notifyTokens", createNotifyToken);
export default router;
