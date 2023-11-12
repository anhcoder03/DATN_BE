import MedicalExaminationInvoice from "../Models/MedicalExaminationInvoice.js";
import MedicalExaminationInvoiceValidate from "../Schemas/MedicalExaminationInvoice.js";

// Get List Medical Examination Invoice
export const getAllMedicalExaminationInvoice = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    _paymentStatus,
    _paymentMethod,
    _id,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
    populate: [{ path: "medicalExaminationSlipId" }],
  };

  try {
    let query = {};
    if (_id) {
      query._id = _id;
    }

    if (_paymentStatus) {
      query.paymentStatus = _paymentStatus;
    }

    if (_paymentMethod) {
      query.paymentMethod = _paymentMethod;
    }

    const MedicalExaminationInvoices = await MedicalExaminationInvoice.paginate(
      query,
      options
    );

    if (!MedicalExaminationInvoices) {
      return res.status(404).json({
        message: "Không tìm thấy danh sách Hóa đơn khám bệnh!",
      });
    }

    return res.status(200).json({
      message: "Lấy danh sách Hóa đơn khám bệnh thành công!",
      MedicalExaminationInvoices,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}
      !`,
    });
  }
};

// Get One Medical Examination Invoice
export const getOneMedicalExaminationInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalExaminationInvoice = await MedicalExaminationInvoice.findById(
      id
    ).populate("medicalExaminationSlipId");

    if (!medicalExaminationInvoice)
      return res.status(404).json({
        message: "Không tìm thấy hóa đơn khám bệnh!",
      });

    return res.status(200).json({
      message: "Lấy hóa đơn khám bệnh thành công!",
      medicalExaminationInvoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi khi xóa hóa đơn khám bệnh ${error.message}!`,
    });
  }
};

// Create Medical Examination Invoice
export const createMedicalExaminationInvoice = async (req, res) => {
  try {
    const { error } = MedicalExaminationInvoiceValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    const medicalExaminationSlipIdExist =
      await MedicalExaminationInvoice.findOne({
        medicalExaminationSlipId: req.body.medicalExaminationSlipId,
      });

    if (medicalExaminationSlipIdExist) {
      return res.status(400).json({
        message:
          "Hóa đơn của phiếu khám này đã được tạo nên không thể tạo 1 lần nữa!",
      });
    }

    // Custom Medical Examination Invoice ID
    let invoiceId = req.body._id;
    if (!invoiceId) {
      const timestamp = new Date().getTime();
      invoiceId = "HDKB" + timestamp.toString();
    }

    const medicalExaminationInvoice = await MedicalExaminationInvoice.create({
      ...req.body,
      _id: invoiceId,
    });

    if (!medicalExaminationInvoice) {
      return res.status(400).json({
        message: "Không có dữ liệu hóa đơn khám để thêm!",
      });
    }

    return res.status(200).json({
      message: "Thêm hóa đơn khám bệnh thành công!",
      medicalExaminationInvoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi khi thêm hóa đơn khám bệnh ${error.message}!`,
    });
  }
};

// Update Medical Examination Invoice
export const updateMedicalExaminationInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = MedicalExaminationInvoiceValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errArr,
      });
    }

    const medicalExaminationInvoice =
      await MedicalExaminationInvoice.findByIdAndUpdate(id, req.body, {
        new: true,
      });

    if (!medicalExaminationInvoice) {
      return res.status(400).json({
        message: "Không có dữ liệu hóa đơn mới để cập nhật!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật hóa đơn khám bệnh thành công!",
      medicalExaminationInvoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi khi thêm hóa đơn khám bệnh ${error.message}!`,
    });
  }
};

// Delete Medical Examination Invoice
export const deleteMedicalExaminationInvoice = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalExaminationInvoice = await MedicalExaminationInvoice.findById(
      id
    );
    if (!medicalExaminationInvoice)
      return res.status(404).json({
        message: "Không tìm thấy hóa đơn khám bệnh cần xóa!",
      });

    await MedicalExaminationInvoice.findByIdAndRemove(id);

    return res.status(200).json({
      message: "Xóa hóa đơn khám bệnh thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi khi xóa hóa đơn khám bệnh ${error.message}!`,
    });
  }
};
