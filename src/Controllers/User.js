import Role from "../Models/Role.js";
import User from "../Models/User.js";
import {
  userValidate,
  changePasswordValidate,
  resetPasswordValidate,
} from "../Schemas/User.js";
import {
  generalAccessToken,
  generalRefreshToken,
  generalVerifyRefreshToken,
} from "../Services/jwtService.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import generateNextId from "../Utils/generateNextId.js";
import generateVerifyToken from "../Middlewares/generateVerifyToken.js";
import { notifyPasswordReseted } from "../configs/nodemailer.js";
import moment from "moment/moment.js";
dotenv.config();

export const getAllUser = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "desc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };
    const users = await User.paginate({}, options);
    if (!users) {
      return res.status(404).json({
        message: "Tài nguyên không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công!",
      users,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công!",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Role.findByIdAndUpdate(user.role, {
      $pull: {
        users: user._id,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Người dùng không tồn tại!",
      });
    }
    return res.json({
      message: "Xoá người dùng thành công!",
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    const { error } = userValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại!",
      });
    }

    // Kiểm tra xem email mới đã tồn tại với _id khác hay không
    const existingEmail = await User.findOne({
      email: req.body.email,
      _id: { $ne: id },
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email này đã tồn tại!",
      });
    }

    const newRole = await Role.findById(role);
    if (!newRole) {
      return res.status(404).json({
        message: "Vai trò mới không tồn tại!",
      });
    } else if (newRole && newRole.status !== 1) {
      return res.status(400).json({
        message: "Vai trò này không hoạt động. Vui lòng chọn vai trò khác!",
      });
    }

    const oldRole = await Role.findById(user.role);
    if (oldRole) {
      oldRole.users.pull(id);
      await oldRole.save();
      newRole.users.push(id);
      await newRole.save();
    }

    // Cập nhật người dùng
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!userUpdated) {
      return res.status(400).json({
        message: "Cập nhật thất bại!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thành công !",
      user: userUpdated,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { error } = userValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    //kiem tra email co ton tai trong CSDL hay chua
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // check vai trò
    const roleIsActive = await Role.findById({ _id: req.body.role });

    if (!roleIsActive) {
      return res.status(400).json({
        message: "Không tìm thấy Vai trò!",
      });
    } else if (roleIsActive && roleIsActive.status !== 1) {
      return res.status(400).json({
        message: "Vai trò này không hoạt động. Vui lòng chọn vai trò khác!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // custom _id
    const lastUser = await User.findOne({}, {}, { sort: { _id: -1 } });
    const userId = generateNextId(lastUser ? lastUser._id : null, "ND");

    const user = await User.create({
      ...req.body,
      _id: userId,
      password: hashedPassword,
    });

    await Role.findByIdAndUpdate(user.role, {
      $addToSet: { users: user._id },
    });
    return res.json({
      message: "Tạo tài khoản mới thành công!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }

    const user = await User.findOne({ email }).populate([
      { path: "role", select: "name roleNumber" },
    ]);
    if (!user) {
      return res.status(400).json({
        message: "Sai tài khoản đăng nhập!",
      });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: "Mật khảu không khớp!",
      });
    }
    user.password = undefined;

    // tạo access token
    const accessToken = generalAccessToken({
      _id: user._id,
    });

    // tạo refresh token
    const refreshToken = generalRefreshToken({
      _id: user._id,
    });
    // refreshTokens.push(refreshToken);
    // await res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   path: "/",
    //   sameSite: "strict",
    // });

    return res.status(201).json({
      message: "Đăng nhập thành công ",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Không có refreshToken!" });
  }
  try {
    const {
      payload: { _id },
    } = generalVerifyRefreshToken({
      refreshToken,
      privateKey: process.env.JWT_RFT_PRIVATE,
    });
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    const accessToken = generalAccessToken({ _id: user._id });

    return res.status(200).json({
      message: "Tạo accessToken mới thành công!",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Password
export const changePassword = async (req, res) => {
  const { _id, password, newPassword } = req.body;
  try {
    const { error } = changePasswordValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errArr,
      });
    }

    //Kiểm tra tài khoản
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).json({
        message: `Tài khoản không tồn tại, vui lòng kiểm tra lại!`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: `Mật khẩu cũ không đúng!`,
      });
    }

    const sameOldPassword = await bcrypt.compare(newPassword, user.password);
    if (sameOldPassword) {
      return res.status(400).json({
        message: "Mật khẩu mới không được trùng với mật khẩu cũ!",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userChangedPassword = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (!userChangedPassword) {
      return res.status(400).json({
        message: "Đổi mật khẩu thất bại!",
      });
    }

    // Gửi mail thông báo Đặt lại mật khẩu thành công
    await notifyPasswordReseted(
      user.email,
      moment(Date.now()).format("HH:mm DD/MM/yyyy")
    ).catch((error) => console.log("Send mail ERROR:", error));

    return res.status(200).json({
      message: "Đổi mật khẩu thành công!",
      user: userChangedPassword,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "You haven't provided an Email address!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Tạo mã xác thực và gửi mail cho người dùng
    const mailSent = await generateVerifyToken(user);
    if (!mailSent) {
      return res.status(400).json({
        message: "Verify token sent failed!",
      });
    }

    return res.status(200).json({ message: "Verify token sent succeed!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    const { error } = resetPasswordValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      user.verifyToken.token !== token ||
      Date.now() > user.verifyToken.expirationTime
    ) {
      return res
        .status(401)
        .json({ message: "Invalid or expired verification code!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.verifyToken = undefined;
    await user.save();

    // Gửi mail thông báo Đặt lại mật khẩu thành công
    await notifyPasswordReseted(
      email,
      moment(Date.now()).format("HH:mm DD/MM/yyyy")
    ).catch((error) => console.log("Send mail ERROR:", error));

    return res
      .status(200)
      .json({ message: "Password reset succeed! You can login." });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
