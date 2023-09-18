import Role from "../Models/Role.js";
import User from "../Models/User.js";
import userValidate from "../Schemas/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  try {
    const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc" } = req.query
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      }
    }
    const users = await User.paginate({}, options);
    if (!users) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
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
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      user,
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

    //kiem tra ten danh muc co ton tai trong CSDL hay chua
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    await Role.findByIdAndUpdate(user.role, {
      $addToSet: { users: user._id },
    });
    return res.json({
      message: "Thêm tài nguyên thành công !",
      user,
    });
  } catch (error) {
    return res.status(404).json({
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

    const user = await User.findOne({ email });
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
    return res.status(201).json({
      message: "Đăng nhập thành công ",
      user,
    });
  } catch (error) {
    return res.status(500).json({
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
    console.log(role);
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
        message: "Người dùng không tồn tại !",
      });
    }
    const newRole = await Role.findById(role);
    if (!newRole) {
      return res.status(404).json({
        message: "Vai trò mới không tồn tại!",
      });
    }

    const oldRole = await Role.findById(user.role);
    if (oldRole) {
      oldRole.users.pull(id);
      await oldRole.save();
      newRole.users.push(id);
      await newRole.save();
    }

    // Cập nhật thuốc
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
