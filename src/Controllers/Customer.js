import Customer from "../Models/Customer.js";
import customerValidate from "../Schemas/Customer.js";
export const getAllCustomers = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
      _gender,
      _createdAt,
      search,
    } = req.query;
    const query = {};
    if (_createdAt) {
      query.createdAt = { $gte: new Date(_createdAt) };
    }
    if (search && search.trim() !== "") {
      query.$or = [
        { phone: { $regex: new RegExp(search, "i") } },
        { name: { $regex: new RegExp(search, "i") } },
        { _id: search },
      ];
    }
    console.log(query);
    if (_gender) {
      query.gender = _gender;
    }
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };
    const customers = await Customer.paginate(query, options);
    if (!customers || customers.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng nào!",
      });
    }
    return res.json({
      message: "Lấy danh sách khách hàng thành công!",
      customers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách khách hàng: " + error.message,
    });
  }
};
export const getOneCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        message: "Khách hàng không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy thông tin khách hàng thành công!",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy thông tin khách hàng: " + error.message,
    });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const { error } = customerValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Dữ liệu không hợp lệ: " + error.message,
      });
    }
    // Kiểm tra xem có mã ID được cung cấp hay không
    let customerId = req.body._id;
    if (!customerId || customerId === "") {
      // Nếu không có mã ID, tạo mã mới bằng cách kết hợp mã KH và mã tự sinh
      const timestamp = new Date().getTime();
      customerId = "KH" + timestamp.toString();
    }

    const existingCustomer = await Customer.findOne({
      $or: [{ citizenId: req.body.citizenId }, { phone: req.body.phone }],
    });

    if (existingCustomer) {
      const duplicateFields = [];
      if (existingCustomer.citizenId === req.body.citizenId) {
        duplicateFields.push("Căn cước công dân đã bị trùng lặp");
      }
      if (existingCustomer.phone === req.body.phone) {
        duplicateFields.push("Số điện thoại đã đã bị trùng lặp");
      }

      return res.status(409).json({
        message: "Thông tin khách hàng đã tồn tại trong cơ sở dữ liệu!",
        duplicateFields: duplicateFields,
      });
    }

    // Sử dụng customerId trong tạo khách hàng mới
    const customer = await Customer.create({ ...req.body, id: customerId });
    return res.status(201).json({
      message: "Thêm khách hàng thành công!",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm khách hàng: " + error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Khách hàng không tồn tại!",
      });
    }
    return res.json({
      message: "Xóa khách hàng thành công!",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa khách hàng: " + error.message,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = customerValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Dữ liệu không hợp lệ: " + error.message,
      });
    }

    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Khách hàng không tồn tại!",
      });
    }

    return res.json({
      message: "Cập nhật khách hàng thành công!",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi cập nhật khách hàng: " + error.message,
    });
  }
};
