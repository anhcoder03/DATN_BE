import express from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  signin,
  signup,
  updateUser,
} from "../Controllers/User.js";

const router = express.Router();
router.get("/user", getAllUser);
router.get("/user/:id", getOneUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);
export default router;
