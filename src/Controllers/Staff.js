import Staff from "../Models/Staff.js";
import StaffValidate from "../Schemas/Staff.js";

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
      message: `Đã xảy ra lỗi khi thêm nhân viên bán thuốc ${error.message}!`,
    });
  }
};

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

    // function update staff
    const updateUserInfo = async () => {
      staff.name = name;
      staff.phone = phone;
      staff.email = email;
      await staff.save();

      return res.status(200).json({
        message: "Cập nhật nhân viên bán thuốc thành công!",
        staff,
      });
    };

    // check before update
    if (name === staff.name || email === staff.email || phone === staff.phone) {
      updateUserInfo();
    } else {
      console.log("aloalo");
      // Nếu tên mới khác tên cũ, kiểm tra xem tên mới đã tồn tại chưa
      const nameExistedArr = await Staff.find({
        name: { $regex: new RegExp("^" + name + "$", "i") },
      });
      const emailExistedArr = await Staff.find({
        email: { $regex: new RegExp("^" + email + "$", "i") },
      });

      if (nameExistedArr.length > 0 || emailExistedArr.length > 0) {
        // Nếu tên mới đã tồn tại
        const existingNameStaff = nameExistedArr.find(
          (staff) => staff.id !== id
        );
        const existingEmailStaff = nameExistedArr.find(
          (staff) => staff.id !== id
        );
        if (existingNameStaff) {
          return res.status(400).json({
            message: "Tên nhân viên này đã tồn tại. Vui lòng chọn tên khác!",
          });
        } else if (existingEmailStaff) {
          return res.status(400).json({
            message:
              "Email nhân viên này đã tồn tại. Vui lòng chọn email khác!",
          });
        } else {
          updateUserInfo();
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi khi cập nhật nhân viên bán thuốc ${error.message}!`,
    });
  }
};
