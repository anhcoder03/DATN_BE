import express from "express";
import { getAllNotification } from "../Controllers/Notification.js";

const router = express.Router();
router.get("/notifications", getAllNotification);

export default router;
