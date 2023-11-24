import Role from "../Models/Role.js";

// Quyền chung
export const generalAuth = async (req, res, next) => {
  try {
    const user = req.user;

    const role = await Role.findById({ _id: user.role });
    if (
      role.roleNumber === 0 ||
      role.roleNumber === 1 ||
      role.roleNumber === 2 ||
      role.roleNumber === 3
    ) {
      next();
    } else {
      return res.status(403).json({
        message: "Bạn không có quyền để thực hiện hành động này!",
      });
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
      return res.status(403).json({
        message: "Bạn phải có quyền Quản trị viên để thực hiện hành động này!",
      });
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
    if (role.roleNumber === 0 || role.roleNumber === 1) {
      next();
    } else {
      return res.status(403).json({
        message: "Bạn không có quyền Bác sĩ để thực hiện hành động này!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Quyền Nhân viên tiếp đón
export const staffAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await Role.findById({ _id: user.role });
    if (role.roleNumber === 0 || role.roleNumber === 2) {
      next();
    } else {
      return res.status(403).json({
        message:
          "Bạn phải có quyền Nhân viên tiếp đón để thực hiện hành động này!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Quyền Nhân viên bán hàng
export const sellerAuth = async (req, res, next) => {
  try {
    const user = req.user;
    const role = await Role.findById({ _id: user.role });
    if (role.roleNumber === 0 || role.roleNumber === 3) {
      next();
    } else {
      return res.status(403).json({
        message:
          "Bạn phải có quyền Nhân viên bán hàng để thực hiện hành động này!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
