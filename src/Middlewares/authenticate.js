import { generalVerifyToken } from "../Services/jwtService.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Bạn cần đăng nhập để thực hiện hành động này!");
    }

    const accessToken = authHeader && authHeader.split(" ")[1];

    let payload = "";
    try {
      payload = generalVerifyToken({
        accessToken,
        privateKey: process.env.JWT_PRIVATE,
      });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token đã hết hạn!");
      } else {
        throw new Error("Token không hợp lệ!");
      }
    }

    const { _id } = payload.payload;
    //get User
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng!");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default authenticate;
