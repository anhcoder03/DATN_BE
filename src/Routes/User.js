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

const router = express.Router();
router.get("/user", getAllUser);
router.get("/user/:id", getOneUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/refreshToken", refreshToken);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
router.put("/changePassword", changePassword);
export default router;
