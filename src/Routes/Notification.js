import express from "express";
import {
  getAllNotification,
  updateNotifycation,
} from "../Controllers/Notification.js";

const router = express.Router();
router.get("/notifications", getAllNotification);
router.put("/notifications/:id", updateNotifycation);

export default router;
