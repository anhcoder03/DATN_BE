import Role from "../Models/Role.js";

// Quyền chung
export const generalAuth = async (req, res, next) => {
  try {
    const user = req.user;

    const role = await Role.findById({ _id: user.role });
    if (
      role.roleNumber === 0 ||
      role.roleNumber === 1 ||
      role.roleNumber === 2
    ) {
      next();
    } else {
      throw new Error("Bạn không có quyền để thực hiện hành động này!");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Quyền Admin
export const adminAuth = async (req, res, next) => {
  try {
    const user = req.user;

    const role = await Role.findById({ _id: user.role });
    if (role.roleNumber !== 0) {
      throw new Error("Bạn không có quyền để thực hiện hành động này!");
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Quyền Bác sĩ
export const doctorAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await Role.findById({ _id: user.role });
    console.log("role.roleNumber:", role.roleNumber);
    if (role.roleNumber === 0 || role.roleNumber === 1) {
      req.isDoctor = role.roleNumber;
      // next();
    } else {
      throw new Error("Bạn không có quyền để thực hiện hành động này!");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Quyền Nhân viên
export const staffAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await Role.findById({ _id: user.role });
    if (role.roleNumber === 0 || role.roleNumber === 2) {
      next();
    } else {
      throw new Error("Bạn không có quyền để thực hiện hành động này!");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
