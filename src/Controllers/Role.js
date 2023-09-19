import Role from "../Models/Role.js";
import User from "../Models/User.js";
import roleValidate from "../Schemas/Role.js";

export const getAllRole = async (req, res) => {
  try {
    const roles = await Role.find();
    if (!roles) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      roles,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      role,
    });
  } catch (error) {
    return res.status(404).json({
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
      return res.status(401).json({
        message: error.message,
      });
    }

    //kiem tra ten danh muc co ton tai trong CSDL hay chua
    const existingRole = await Role.findOne({ name: req.body.name });
    if (existingRole) {
      return res.status(400).json({
        message: "Tên vai trò đã tồn tại trong cơ sở dữ liệu",
      });
    }

    const role = await Role.create(req.body);
    return res.json({
      message: "Thêm tài nguyên thành công !",
      role,
    });
  } catch (error) {
    return res.status(404).json({
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
      return res.status(401).json({
        message: error.message,
      });
    }

    const role = await Role.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!role) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      role,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

// export const deleteRole = async (req, res) => {
//   try {
//     const role = await Role.findByIdAndRemove(req.params.id);

//     if (!role) {
//       return res.status(400).json({
//         message: "Tài nguyên không tồn tại!",
//       });
//     }
//     return res.json({
//       message: "Xoá vai trò thành công!",
//       role,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: error.message,
//     });
//   }
// };

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem category có tồn tại không
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({
        message: "Không tìm thấy vai trò!",
      });
    }
    const users = await User.find({ role: id });

    const noRoleYet = await Role.findOne({ name: "Chưa có vai trò" });
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
      const newNoRoleyet = await Role.create({ name: "Chưa có vai trò" });
      await User.updateMany({ role: id }, { role: newNoRoleyet._id });

      await Role.findByIdAndUpdate(newNoRoleyet._id, {
        $push: {
          users: {
            $each: users.map((user) => user._id),
          },
        },
      });
    }

    await Role.findByIdAndDelete(id);
    return res.json({
      message: "Xóa danh mục thuốc thành công !",
    });
  } catch (error) {
    return res.status(404).json({
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
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      users: users.users,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
