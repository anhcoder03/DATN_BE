import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../Controllers/Category.js";
import authenticate from "../Middlewares/authenticate.js";
import { generalAuth } from "../Middlewares/authorization.js";
const router = express.Router();
router.get("/categories", authenticate, generalAuth, getAllCategory);
router.get("/categories/:id", authenticate, generalAuth, getOneCategory);
router.post("/categories", authenticate, generalAuth, addCategory);
router.delete("/categories/:id", authenticate, generalAuth, deleteCategory);
router.put("/categories/:id", authenticate, generalAuth, updateCategory);
export default router;
