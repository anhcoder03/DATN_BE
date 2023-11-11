import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOne,
  updateOrder,
} from "../Controllers/Order.js";

const router = Router();
router.get("/orders", getAllOrder);
router.post("/orders", createOrder);
router.get("/orders/:id", getOne);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
