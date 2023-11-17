import express from "express";
import { createNotifyToken, getAllToken } from "../Controllers/NotifyToken.js";

const router = express.Router();
router.get("/notifyTokens", getAllToken);
router.post("/notifyTokens", createNotifyToken);
export default router;
