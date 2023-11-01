import express from "express";
import {
  deleteServiceByExam,
  getAllByIdExamination,
  getAllServiceByExamination,
} from "../Controllers/ServiceByExamination.js";

const router = express.Router();
router.get("/serviceByExamination", getAllServiceByExamination);
router.get("/serviceByExamination/:id", getAllByIdExamination);
router.delete("/serviceByExamination/:id", deleteServiceByExam);
export default router;
