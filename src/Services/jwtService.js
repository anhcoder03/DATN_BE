import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Create accessToken
export const generalAccessToken = (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.JWT_PRIVATE, {
    expiresIn: process.env.JWT_PRIVATE_EXP,
  });
  return accessToken;
};

// Create refreshToken
export const generalRefreshToken = (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.JWT_RFT_PRIVATE, {
    expiresIn: process.env.JWT_RFT_PRIVATE_EXP,
  });
  return refreshToken;
};

// Verify same accessToken
export const generalVerifyToken = ({ accessToken, privateKey }) => {
  const verifyToken = jwt.verify(accessToken, privateKey);
  return verifyToken;
};

// Verify same refreshToken
export const generalVerifyRefreshToken = ({ refreshToken, privateKey }) => {
  const verifyToken = jwt.verify(refreshToken, privateKey);
  return verifyToken;
};
