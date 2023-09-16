import express from "express";
import { addCustomer, deleteCustomer, getAllCustomers, getOneCustomer, updateCustomer } from "../Controllers/Customer.js";
const router = express.Router();
router.get("/customers", getAllCustomers);
router.get("/customers/:id", getOneCustomer);
router.post("/customers", addCustomer);
router.delete("/customers/:id", deleteCustomer);
router.put("/customers/:id", updateCustomer);
export default router;
