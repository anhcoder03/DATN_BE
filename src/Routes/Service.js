import express from "express";
import { addService, deleteService, getAllService, getOneService, updateService } from "../Controllers/Service.js";
const router = express.Router();
router.get("/services", getAllService);
router.get("/services/:id", getOneService);
router.post("/services", addService);
router.delete("/services/:id", deleteService);
router.put("/services/:id", updateService);
export default router;
