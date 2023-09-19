import MedicalExaminationSlip from "../Models/MedicalExaminationSlip.js";
import medicineExaminationSlipValidate from "../Schemas/MedicalExaminationSlip.js";

export const getAllMedicalExaminationSlip = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
      populate: [
        { path: "customerId" },
        { path: "doctorId" },
        { path: "staffId" },
        { path: "clinicId" },
        { path: "examinationServiceId" },
      ],
    };
    const medicalExaminationSlips = await MedicalExaminationSlip.paginate(
      {},
      options
    );
    if (!medicalExaminationSlips || medicalExaminationSlips.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy phiếu khám nào!",
      });
    }

    return res.json({
      message: "Lấy danh sách phiếu khám thành công!",
      medicalExaminationSlips,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách khách hàng: " + error.message,
    });
  }
};

export const createMedicalExaminationSlip = async (req, res) => {
  try {
    const { error } = medicineExaminationSlipValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(401).json({
        message: error.details[0].message,
      });
    }
    const medicine = await MedicalExaminationSlip.create(req.body);
    return res.json({
      message: "Thêm sản phẩm thành công",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const medicine = await MedicalExaminationSlip.findById(
      req.params.id
    ).populate([
      "customerId",
      "doctorId",
      "staffId",
      "clinicId",
      "examinationServiceId",
    ]);
    if (!medicine) {
      return res.status(400).json({
        message: "Phiếu khám không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy phiếu khám thành công!",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
