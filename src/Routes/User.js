import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUser,
  getOneUser,
  refreshToken,
  signin,
  signup,
  updateUser,
} from "../Controllers/User.js";
import { adminAuth, generalAuth } from "../Middlewares/authorization.js";
import authenticate from "../Middlewares/authenticate.js";

const router = express.Router();
router.get("/user", authenticate, generalAuth, getAllUser);
router.get("/user/:id", authenticate, generalAuth, getOneUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refreshToken", refreshToken);
router.delete("/user/:id", authenticate, adminAuth, deleteUser);
router.put("/user/:id", authenticate, updateUser);
router.put("/changePassword", authenticate, changePassword);
export default router;
