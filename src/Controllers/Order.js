import Order from "../Models/Order.js";
import Customer from "../Models/Customer.js";
import OrderValidate from "../Schemas/Order.js";
import generateNextId from "../Utils/generateNextId.js";

export const getAllOrder = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    _status,
    _orderType,
    _paymentStatus,
    _creatorId,
    search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
    populate: [
      { path: "customerId", select: "_id name phone" },
      { path: "creatorId", select: "_id name phone" },
      { path: "prescriptionId" },
      { path: "medicines.medicineId", select: "_id name price" },
    ],
  };

  try {
    let query = {};
    const searchRegex = new RegExp(search, "i");
    if (search && search.trim() !== "") {
      query.$or = [
        {
          "customer._id": { $regex: searchRegex },
        },
        {
          "customer.name": { $regex: searchRegex },
        },
        {
          "customer.phone": { $regex: searchRegex },
        },
        { _id: { $regex: searchRegex } },
      ];
    }
    if (_status) {
      query.status = _status;
    }
    if (_orderType) {
      query.orderType = _orderType;
    }
    if (_paymentStatus) {
      query.paymentStatus = _paymentStatus;
    }
    if (_creatorId) {
      query.creatorId = _creatorId;
    }

    const orders = await Order.paginate(query, options);
    if (!orders || (orders && !orders.docs.length)) {
      return res.status(400).json({
        message: `Không có dữ liệu Đơn hàng!`,
      });
    }
    return res.status(200).json({
      message: "Lấy danh sách Đơn hàng thành công!",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id)
      .populate("creatorId")
      .populate("prescriptionId")
      .populate({ path: "customerId", select: "_id name phone" })
      .populate({ path: "medicines.medicineId", select: "_id name price" });

    if (!order) {
      return res.status(400).json({
        message: `Không tìm thấy dữ liệu Đơn hàng!`,
      });
    }
    return res.status(200).json({
      message: "Lấy dữ liệu Đơn hàng thành công!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { error } = OrderValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    // custom id order
    const lastOrder = await Order.findOne({}, {}, { sort: { _id: -1 } });
    const orderId = generateNextId(lastOrder ? lastOrder._id : null, "DH");

    // create customer
    let customerData = "";
    const customer = await Customer.findById(req.body.customerId);
    if (customer) {
      customerData = {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
      };
    }

    const order = await Order.create({
      ...req.body,
      _id: orderId,
      prescriptionId: null,
      customer: customerData,
    });
    if (!order) {
      return res.status(400).json({
        message: "Không có dữ liệu Đơn hàng để thêm!",
      });
    }

    order.customer = undefined;
    return res.status(200).json({
      message: "Tạo Đơn hàng thành công!",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

export const updateOrder = async (req, res) => {
  const { status, paymentStatus } = req.body;
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: "Không tìm thấy dữ liệu Đơn hàng cần cập nhật!",
      });
    } else if (
      (order && order.status === "Hoàn thành") ||
      (order && order.status === "Đã hủy")
    ) {
      return res.status(400).json({
        message: "Đơn hàng này đã Hoàn thành hoặc Đã hủy, không thể chỉnh sửa!",
      });
    }

    const { error } = OrderValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    let paymentStatusChange = paymentStatus;
    let statusChange = status;
    if (status === "Hoàn thành") {
      paymentStatusChange = "Đã thanh toán";
    }

    if (paymentStatus === "Đã thanh toán") {
      statusChange = "Hoàn thành";
    }

    const orderUpdated = await Order.findByIdAndUpdate(
      id,
      {
        ...req.body,
        status: statusChange,
        paymentStatus: paymentStatusChange,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Cập nhật Đơn hàng thành công!",
      order: orderUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({
        message: "Không tìm thấy dữ liệu Đơn hàng cần xóa!",
      });
    } else if (
      (order && order.status === "Hoàn thành") ||
      (order && order.status === "Đã hủy")
    ) {
      return res.status(400).json({
        message: "Đơn hàng này đã Hoàn thành hoặc Đã hủy, không thể xóa!",
      });
    }

    await Order.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Xóa Đơn hàng thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};
