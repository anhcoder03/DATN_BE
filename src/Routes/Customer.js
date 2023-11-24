import express from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
} from "../Controllers/Customer.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get("/customers", authenticate, generalAuth, getAllCustomers);
router.get("/customers/:id", authenticate, generalAuth, getOneCustomer);
router.post("/customers", authenticate, generalAuth, addCustomer);
router.delete("/customers/:id", authenticate, generalAuth, deleteCustomer);
router.put("/customers/:id", authenticate, generalAuth, updateCustomer);
export default router;
