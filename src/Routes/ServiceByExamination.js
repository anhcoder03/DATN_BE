import express from "express";
import { getAllByIdExamination } from "../Controllers/ServiceByExamination.js";

const router = express.Router();
router.get("/serviceByExamination/:id", getAllByIdExamination);
export default router;
