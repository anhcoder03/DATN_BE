import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOne,
  updateOrder,
} from "../Controllers/Order.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth, sellerAuth } from "../Middlewares/authorization.js";

const router = Router();
router.get("/orders", authenticate, generalAuth, getAllOrder);
router.get("/orders/:id", authenticate, generalAuth, getOne);
router.post("/orders", authenticate, sellerAuth, createOrder);
router.put("/orders/:id", authenticate, sellerAuth, updateOrder);
router.delete("/orders/:id", authenticate, sellerAuth, deleteOrder);

export default router;
