import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOne,
  updateOrder,
} from "../Controllers/Order.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";

const router = Router();
router.get("/orders", authenticate, generalAuth, getAllOrder);
router.post("/orders", authenticate, generalAuth, createOrder);
router.get("/orders/:id", authenticate, generalAuth, getOne);
router.put("/orders/:id", authenticate, generalAuth, updateOrder);
router.delete("/orders/:id", authenticate, generalAuth, deleteOrder);

export default router;
