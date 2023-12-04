import { generateVerifyTokenMail } from "../configs/nodemailer.js";

const generateVerifyToken = async (user) => {
  try {
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = Date.now() + 60000;

    user.verifyToken = { token, expirationTime };
    await user.save();

    // Gửi mail mã xác thực
    await generateVerifyTokenMail(user.email, token).catch((error) =>
      console.log("Send mail ERROR:", error)
    );
  } catch (error) {
    console.log("Error when generage verify token:", error.message);
  }
};

export default generateVerifyToken;
