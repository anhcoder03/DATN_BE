import { generalVerifyToken } from "../Services/jwtService.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Bạn cần đăng nhập để thực hiện hành động này!",
      });
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
        return res.status(400).json({
          message: "Token đã hết hạn!",
        });
      } else {
        return res.status(400).json({
          message: "Token không hợp lệ!",
        });
      }
    }

    const { _id } = payload.payload;
    //get User
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng!",
      });
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
