import express from "express";
import {
  addService,
  deleteService,
  getAllService,
  getOneService,
  updateService,
} from "../Controllers/Service.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get("/services", authenticate, generalAuth, getAllService);
router.get("/services/:id", authenticate, generalAuth, getOneService);
router.post("/services", authenticate, generalAuth, addService);
router.delete("/services/:id", authenticate, generalAuth, deleteService);
router.put("/services/:id", authenticate, generalAuth, updateService);
export default router;
