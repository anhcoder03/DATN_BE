import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../Controllers/CategoryController.js";
const router = express.Router();
router.get("/categories", getAllCategory);
router.get("/categories/:id", getOneCategory);
router.post("/categories", addCategory);
router.delete("/categories/:id", deleteCategory);
router.put("/categories/:id", updateCategory);
export default router;
