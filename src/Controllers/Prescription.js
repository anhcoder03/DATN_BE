import MedicalExaminationSlip from "../Models/MedicalExaminationSlip.js";
import User from "../Models/User.js";
import Prescription from "../Models/Prescription.js";
import Medicine from "../Models/Medicine.js";
import PrescriptionValidate from "../Schemas/Prescription.js";
import generateNextId from "../Utils/generateNextId.js";
import handleTotalOrder from "../Utils/handleTotalOrder.js";
import Order from "../Models/Order.js";

// get all Prescription
export const getAllPrescription = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    _status,
    _doctorId,
    search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
    populate: [
      { path: "doctorId", select: "_id name phone" },
      { path: "medicalExaminationSlipId" },
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
        {
          "doctor._id": { $regex: searchRegex },
        },
        {
          "doctor.name": { $regex: searchRegex },
        },
        {
          "doctor.phone": { $regex: searchRegex },
        },
        { medicalExaminationSlipId: { $regex: searchRegex } },
        { _id: { $regex: searchRegex } },
        { doctorId: { $regex: searchRegex } },
      ];
    }

    if (_status) {
      query.status = _status;
    }

    if (_doctorId) {
      query.doctorId = _doctorId;
    }

    const prescriptions = await Prescription.paginate(query, options);

    if (!prescriptions) {
      return res.status(400).json({
        message: "Không tìm thấy danh sách Kê đơn!",
      });
    }

    const pojoPrescriptions = prescriptions.docs.map((doc) => doc.toObject());

    pojoPrescriptions.forEach((doc) => {
      delete doc.customer;
      delete doc.doctor;
    });

    return res.status(200).json({
      message: "Lấy danh sách Kê đơn thành công!",
      prescriptions: {
        ...prescriptions,
        docs: pojoPrescriptions,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// get one Prescription
export const getOnePrescription = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id)
      .populate("doctorId")
      .populate("medicalExaminationSlipId")
      .populate({ path: "medicines.medicineId", select: "_id name price" });

    if (!prescription) {
      return res.status(400).json({
        message: "Không tìm thấy dữ liệu Kê đơn!",
      });
    }

    return res.status(200).json({
      message: "Tìm dữ liệu Kê đơn thành công!",
      prescription,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// create new Prescription
export const createPrescription = async (req, res) => {
  const { doctorId, medicalExaminationSlipId, medicines } = req.body;
  try {
    const { error } = PrescriptionValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    // create customer
    let customer = "";
    const medicalExaminationSlip = await MedicalExaminationSlip.findById(
      medicalExaminationSlipId
    );
    if (medicalExaminationSlip && medicalExaminationSlip.customer) {
      customer = medicalExaminationSlip.customer;
    }
    // create doctor
    let doctor = "";
    const user = await User.findById(doctorId);
    if (user) {
      doctor = {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      };
    }

    const lastPrescription = await Prescription.findOne(
      {},
      {},
      { sort: { _id: -1 } }
    );
    const prescriptionId = generateNextId(
      lastPrescription ? lastPrescription._id : null,
      "KD"
    );

    const prescription = await Prescription.create({
      ...req.body,
      _id: prescriptionId,
      customer,
      doctor,
    });

    // Tạo mảng mới để chứa thông tin medicine với giá match với model Order
    const orderMedicines = [];

    for (const medicineData of medicines) {
      const medicine = await Medicine.findById(medicineData.medicineId);

      if (medicine) {
        orderMedicines.push({
          medicineId: medicineData.medicineId,
          quantity: medicineData.quantity,
          price: medicine.price,
          totalPrice: medicine.price * medicineData.quantity,
        });
      }
    }

    // Custom Id Order
    const lastOrder = await Order.findOne({}, {}, { sort: { _id: -1 } });

    const orderId = generateNextId(lastOrder ? lastOrder._id : null, "DH");

    // Tạo Order
    const newOrder = {
      id: orderId,
      customer,
      customerId: medicalExaminationSlip.customerId,
      creatorId: prescription.doctorId,
      prescriptionId: prescription._id,
      medicines: orderMedicines,
      totalAmount: handleTotalOrder(orderMedicines),
      orderType: "Kê đơn",
      paymentStatus: "Chưa thanh toán",
      paymentMethod: "Tiền mặt",
      status: "Đang chờ xử lý",
      note: prescription.note,
    };

    await Order.create(newOrder);

    if (!prescription) {
      return res.status(400).json({
        message: "Không có dữ liệu Kê đơn để thêm!",
      });
    }

    prescription.customer = undefined;
    prescription.doctor = undefined;
    return res.status(200).json({
      message: "Kê đơn thành công!",
      prescription,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// update new Prescription
export const updatePrescription = async (req, res) => {
  const { doctorId, medicalExaminationSlipId, medicines } = req.body;
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(400).json({
        message: "Không tìm thấy Kê đơn cần cập nhật",
      });
    }

    // Kiểm tra điều kiện isComplete
    if (prescription && prescription.status === "Hoàn thành") {
      return res.status(400).json({
        message:
          "Đơn hàng thuộc phiếu Kê đơn này đã hoàn thành, không thể cập nhật!",
      });
    }

    const { error } = PrescriptionValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    // create customer
    let customer = "";
    const medicalExaminationSlip = await MedicalExaminationSlip.findById(
      medicalExaminationSlipId
    );
    if (medicalExaminationSlip && medicalExaminationSlip.customer) {
      customer = medicalExaminationSlip.customer;
    }
    // create doctor
    let doctor = "";
    const user = await User.findById(doctorId);
    if (user) {
      doctor = {
        _id: user._id,
        name: user.name,
      };
    }

    // Cập nhật Prescription
    const prescriptionUpdated = await Prescription.findByIdAndUpdate(
      id,
      { ...req.body, customer, doctor },
      {
        new: true,
      }
    );

    // Tạo mảng mới để chứa thông tin medicine với giá match với model Order
    const orderMedicines = [];

    for (const medicineData of medicines) {
      const medicine = await Medicine.findById(medicineData.medicineId);
      if (medicine) {
        orderMedicines.push({
          medicineId: medicineData.medicineId,
          quantity: medicineData.quantity,
          price: medicine.price,
          totalPrice: medicine.price * medicineData.quantity,
        });
      }
    }

    // Tạo Order
    const newOrder = {
      customer,
      customerId: medicalExaminationSlip.customerId,
      prescriptionId: prescription._id,
      medicines: orderMedicines,
      totalAmount: handleTotalOrder(orderMedicines),
      orderType: "Kê đơn",
      paymentStatus: "Chưa thanh toán",
      paymentMethod: "Tiền mặt",
      status: "Đang chờ xử lý",
      note: prescription.note,
    };

    const order = await Order.findOne({ prescriptionId: id });
    await Order.findByIdAndUpdate(order._id, newOrder);

    if (!prescription) {
      return res.status(400).json({
        message: "Không có dữ liệu Kê đơn để cập nhật!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật Kê đơn thành công!",
      prescription: prescriptionUpdated,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// delete Prescription
export const deletePrescription = async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(400).json({
        message: "Không tìm thấy Kê đơn!",
      });
    } else if (prescription && prescription.status === "Hoàn thành") {
      return res.status(400).json({
        message:
          "Đơn hàng thuộc phiếu Kê đơn này đã hoàn thành, không thể xóa!",
      });
    }

    const order = await Order.findOne({ prescriptionId: id });

    const prescriptionDeleted = Prescription.findByIdAndDelete(id);
    const orderDeleted = Order.findByIdAndDelete(order._id);

    await Promise.all([prescriptionDeleted, orderDeleted]);

    return res.status(200).json({
      message: "Xóa Kê đơn thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};
