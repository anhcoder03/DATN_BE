import Role from "../Models/Role.js";
import User from "../Models/User.js";
import roleValidate from "../Schemas/Role.js";
import generateNextId from "../Utils/generateNextId.js";

export const getAllRole = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
  };
  try {
    let query = {};

    const searchRegex = new RegExp(search, "i");
    if (search && search.trim() !== "") {
      query.$or = [
        { _id: { $regex: searchRegex } },
        { name: { $regex: searchRegex } },
      ];
    }

    const roles = await Role.paginate(query, options);
    if (!roles) {
      return res.status(404).json({
        message: "Không tìm thấy danh sách Vai trò!",
      });
    }
    return res.json({
      message: "Lấy danh sách Vai trò thành công!",
      roles,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({
        message: "Vai trò không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy dữ liệu Vai trò thành công!",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addRole = async (req, res) => {
  try {
    const { error } = roleValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    const roleNameLowerCase = req.body.name.trim().toLowerCase();

    //kiem tra ten Vai tro co ton tai trong CSDL hay chua
    const existingRole = await Role.findOne({
      name: { $regex: new RegExp("^" + roleNameLowerCase + "$", "i") },
    });
    if (existingRole) {
      return res.status(400).json({
        message: "Tên Vai trò đã tồn tại trong cơ sở dữ liệu!",
      });
    }

    const lastRole = await Role.findOne({}, {}, { sort: { _id: -1 } });
    const roleId = generateNextId(lastRole ? lastRole._id : null, "VT");

    const role = await Role.create({ ...req.body, _id: roleId });
    return res.json({
      message: "Thêm vai trò thành công!",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const id = req.params.id;

    // validate form
    const { error } = roleValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }
    // Kiểm tra xem tên mới đã tồn tại với _id khác
    const existingRole = await Role.findOne({
      name: req.body.name,
      _id: { $ne: id },
    });

    if (existingRole) {
      return res.status(400).json({
        message: "Tên Vai trò này đã tồn tại!",
      });
    }

    const role = await Role.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!role) {
      return res.status(400).json({
        message: "Vai trò không tồn tại!",
      });
    }
    // else if (role && role.name == "admin") {
    //   return res.status(400).json({
    //     message:
    //       "Admin là chức danh cao nhất của hệ thống. Không thể chỉnh sửa!",
    //   });
    // }
    return res.json({
      message: "Cập nhật vai trò thành công!",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    // Kiểm tra xem Role có tồn tại không
    const role = await Role.findById(id);
    let roleNameLower = role && role.name ? role.name.toLowerCase() : undefined;
    if (!role) {
      return res.status(404).json({
        message: "Không tìm thấy Vai trò!",
      });
    }
    if (role && role.name && roleNameLower === "admin") {
      return res.status(400).json({
        message: "Admin là chức danh cao nhất của hệ thống. Không thể xóa!",
      });
    }

    const users = await User.find({ role: id });

    const noRoleYet = await Role.findOne({ name: "Chưa có Vai trò" });
    if (noRoleYet) {
      await User.updateMany({ role: id }, { role: noRoleYet._id });
      await Role.findByIdAndUpdate(noRoleYet._id, {
        $push: {
          users: {
            $each: users.map((user) => user._id),
          },
        },
      });
    } else {
      const lastRole = await Role.findOne({}, {}, { sort: { _id: -1 } });
      const roleId = generateNextId(lastRole ? lastRole._id : null, "VT");

      const newNoRoleyet = await Role.create({
        _id: roleId,
        name: "Chưa có Vai trò",
      });
      await User.updateMany({ role: id }, { role: newNoRoleyet._id });

      await Role.findByIdAndUpdate(newNoRoleyet._id, {
        $push: {
          users: {
            $each: users.map((user) => user._id),
          },
        },
      });
    }

    await Role.findByIdAndDelete(role._id);
    return res.json({
      message: "Xóa Vai trò thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const users = await Role.findOne({ name: req.query.name }).populate(
      "users"
    );
    if (!users) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công!",
      users: users.users,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
