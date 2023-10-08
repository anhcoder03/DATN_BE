import Prescription from "../Models/Prescription.js";
import PrescriptionDetail from "../Models/PrescriptionDetail.js";
import PrescriptionValidate from "../Schemas/Prescription.js";

// ------------- PRESCRIPTION-------------------------
// get all Prescription
export const getAllPrescription = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    _id,
    _customerId,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
    populate: [
      { path: "doctorId" },
      { path: "customerId" },
      { path: "staffId" },
    ],
  };

  try {
    let query = {};

    if (_id) {
      query._id = _id;
    }

    if (_customerId) {
      query.customerId = _customerId;
    }

    const prescriptions = await Prescription.paginate(query, options);

    if (!prescriptions || prescriptions.docs.length === 0) {
      return res.status(400).json({
        message: "Không tìm thấy danh sách Đơn thuốc!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách Đơn thuốc thành công!",
      prescriptions,
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
      .populate("customerId")
      .populate("staffId");

    if (!prescription) {
      return res.status(400).json({
        message: "Không tìm thấy Đơn thuốc!",
      });
    }

    return res.status(200).json({
      message: "Tìm Đơn thuốc thành công!",
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
  const {
    doctorId,
    customerId,
    staffId,
    totalAmount,
    status,
    paymentMethod,
    medicines,
  } = req.body;
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

    // Custom prescriptionId
    let prescriptionId = req.body._id;
    if (!prescriptionId) {
      const timestamp = new Date().getTime();
      prescriptionId = "DT" + timestamp.toString();
    }

    const prescription = await Prescription.create({
      doctorId,
      customerId,
      staffId,
      totalAmount,
      status,
      paymentMethod,
      _id: prescriptionId,
    });
    if (!prescription) {
      return res.status(400).json({
        message: "Không có dữ liệu Đơn thuốc để thêm!",
      });
    }

    const prescrirptionDetail = await PrescriptionDetail.create({
      prescriptionId: prescription._id,
      medicines,
    });

    return res.status(200).json({
      message: "Tạo Đơn thuốc thành công!",
      prescription,
      prescrirptionDetail,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// update new Prescription
export const updatePrescription = async (req, res) => {
  const { medicines } = req.body;

  const { id } = req.params;
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

    const prescription = await Prescription.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!prescription) {
      return res.status(400).json({
        message: "Không có dữ liệu Đơn thuốc để cập nhật!",
      });
    }

    // tìm ra prescription detail
    await PrescriptionDetail.findOneAndUpdate(
      {
        prescriptionId: prescription._id,
      },
      { prescriptionId: prescription._id, medicines }
    );

    return res.status(200).json({
      message: "Cập nhật Đơn thuốc thành công!",
      prescription,
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
        message: "Không tìm thấy Đơn thuốc!",
      });
    }

    const prescriptionDelete = Prescription.findByIdAndDelete(id);
    const prescriptionDetailDelete = PrescriptionDetail.findOneAndDelete({
      prescriptionId: prescription._id,
    });
    await Promise.all([prescriptionDelete, prescriptionDetailDelete]);

    return res.status(200).json({
      message: "Xóa Đơn thuốc thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};

// ------------- PRESCRIPTION DETAIL -------------------------

// get all Prescription Detail
export const getAllPrescriptionDetail = async (req, res) => {
  try {
    const prescriptionDetails = await PrescriptionDetail.find({});

    if (!prescriptionDetails || prescriptionDetails.length === 0) {
      return res.status(400).json({
        message: "Không tìm thấy danh sách Chi tiết Đơn thuốc!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách Chi tiết đơn thuốc thành công!",
      prescriptionDetails,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// get one Prescription Detail
export const getOnePrescriptionDetail = async (req, res) => {
  const { prescriptionId } = req.params;
  try {
    const prescriptionDetail = await PrescriptionDetail.findOne({
      prescriptionId,
    })
      .populate("prescriptionId")
      .populate("medicines.medicineId");

    if (!prescriptionDetail) {
      return res.status(400).json({
        message: "Không tìm thấy Chi tiết đơn thuốc!",
      });
    }

    return res.status(200).json({
      message: "Tìm Chi tiết đơn thuốc thành công!",
      prescriptionDetail,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};
