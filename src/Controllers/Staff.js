import Staff from "../Models/Staff.js";
import StaffValidate from "../Schemas/Staff.js";

// get all staff
export const getAllStaff = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    _email,
    _name,
    _phone,
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

    if (_name) {
      query.name = _name;
    }

    if (_email) {
      query.email = _email;
    }

    if (_phone) {
      query.phone = _phone;
    }
    const staffs = await Staff.paginate(query, options);
    if (!staffs || staffs.docs.length === 0) {
      return res.status(400).json({
        message: "Không tìm thấy danh sách nhân viên bán thuốc!",
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách nhân viên bán thuốc thành công!",
      staffs,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};

// get one staff
export const getOneStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(400).json({
        message: "Không tìm thấy nhân viên bán thuốc!",
      });
    }
    return res.status(200).json({
      message: "Tìm nhân viên bán thuốc thành công!",
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};

// create new staff
export const createStaff = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const { error } = StaffValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    // validate NAME before create new staff
    const nameExists = await Staff.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (nameExists) {
      return res.status(400).json({
        message: "Tên nhân viên này đã tồn tại. Vui lòng chọn tên khác!",
      });
    }

    // validate EMAIL before create new staff
    const emailExists = await Staff.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email nhân viên này đã tồn tại. Vui lòng chọn email khác!",
      });
    }

    // validate PHONE before create new staff
    const phoneExists = await Staff.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        message:
          "Số điện thoại nhân viên này đã tồn tại. Vui lòng chọn số điện thoại khác!",
      });
    }

    const staff = await Staff.create(req.body);

    if (!staff) {
      return res.status(400).json({
        message: "Không có dữ liệu nhân viên bán thuốc để thêm!",
      });
    }

    return res.status(200).json({
      message: "Thêm nhân viên bán thuốc thành công!",
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};

// update staff
export const updateStaff = async (req, res) => {
  const { name, phone, email } = req.body;
  const { id } = req.params;
  try {
    const { error } = StaffValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(400).json({
        message: "Không tìm thấy nhân viên bán thuốc!",
      });
    }

    // hàm cập nhật thông in nhân viên
    const updateStaffInfo = async () => {
      staff.name = name;
      staff.phone = phone;
      staff.email = email;
      await staff.save();

      return res.status(200).json({
        message: "Cập nhật nhân viên bán thuốc thành công!",
        staff,
      });
    };

    // Check trước khi update
    const nameExistedArr = await Staff.find({
      name: { $regex: new RegExp("^" + name + "$", "i") },
      _id: { $ne: id }, // Loại trừ nhân viên có id trùng với id từ params
    });
    const emailExistedArr = await Staff.find({
      email: { $regex: new RegExp("^" + email + "$", "i") },
      _id: { $ne: id }, // Loại trừ nhân viên có id trùng với id từ params
    });
    const phoneExistedArr = await Staff.find({
      phone,
      _id: { $ne: id }, // Loại trừ nhân viên có id trùng với id từ params
    });

    if (nameExistedArr.length > 0) {
      // Nếu tên gửi từ form trùng với tên của 1 nhân viên trong db
      return res.status(400).json({
        message: "Tên nhân viên này đã tồn tại. Vui lòng chọn tên khác!",
      });
    } else if (emailExistedArr.length > 0) {
      // Nếu email gửi từ form trùng với tên của 1 nhân viên trong db
      return res.status(400).json({
        message: "Email nhân viên này đã tồn tại. Vui lòng chọn email khác!",
      });
    } else if (phoneExistedArr.length > 0) {
      // Nếu sdt gửi từ form trùng với tên của 1 nhân viên trong db
      return res.status(400).json({
        message:
          "Số điện thoại này sử dụng cho nhân viên khác. Vui lòng chọn số khác!",
      });
    } else {
      // Nếu ko trùng với nhân viên nào cả 3 trường thì cập nhật
      updateStaffInfo();
    }
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};

// delete staff
export const deleteStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(400).json({
        message: "Không tìm thấy nhân viên bán thuốc!",
      });
    }

    await Staff.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Xóa nhân viên bán thuốc thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};
