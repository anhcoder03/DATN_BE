import express from "express";
import {
  deleteServiceByExam,
  getAllByIdExamination,
  getAllServiceByExamination,
  getOne,
  updateServiceByExam,
} from "../Controllers/ServiceByExamination.js";

const router = express.Router();
router.get("/serviceByExamination", getAllServiceByExamination);
router.get("/serviceByExamination/:id", getAllByIdExamination);
router.get("/serviceExaminationById/:id", getOne);
router.put("/serviceExaminationById/:id", updateServiceByExam);
router.delete("/serviceByExamination/:id", deleteServiceByExam);
export default router;
