import Customer from "../Models/Customer.js";
import MedicalExaminationSlip from "../Models/MedicalExaminationSlip.js";
import ServiceByExamination from "../Models/ServiceByExamination.js";
import medicineExaminationSlipValidate from "../Schemas/MedicalExaminationSlip.js";
import generateNextId from "../Utils/generateNextId.js";

export const getAllExamination = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 10,
      _sort = "createdAt",
      _order = "asc",
      status,
      search,
      doctorId,
      staffId,
      clinicId,
    } = req.query;
    let query = {};
    const options = {
      page: _page,
      limit: _limit,

      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
      populate: [
        {
          path: "customerId",
          select: "name phone _id dateOfBirth gender email note",
        },
        { path: "doctorId" },
        { path: "staffId" },
        { path: "clinicId" },
        { path: "examinationServiceId" },
      ],
    };
    const searchRegex = new RegExp(search, "i");
    if (search && search.trim() !== "") {
      query.$or = [
        {
          "customer.phone": { $regex: searchRegex },
        },
        { "customer.name": { $regex: searchRegex } },
        { _id: { $regex: searchRegex } },
      ];
    }
    if (status) {
      query.status = status;
    }
    if (doctorId) {
      query.doctorId = doctorId;
    }
    if (staffId) {
      query.staffId = staffId;
    }
    if (clinicId) {
      query.clinicId = clinicId;
    }
    console.log(query);
    const medicalExaminationSlips = await MedicalExaminationSlip.paginate(
      query,
      options
    );
    if (
      !medicalExaminationSlips ||
      medicalExaminationSlips?.docs.length === 0
    ) {
      return res.status(404).json({
        message: "Không tìm thấy phiếu khám nào!",
      });
    }
    // Chuyển đổi tài liệu kết quả thành plain JavaScript objects (POJO)
    const pojoMedicalExaminationSlips = medicalExaminationSlips.docs.map(
      (doc) => doc.toObject()
    );

    // Loại bỏ trường "customer" từ POJO
    pojoMedicalExaminationSlips.forEach((doc) => {
      delete doc.customer;
    });
    return res.json({
      message: "Lấy danh sách phiếu khám thành công!",
      medicalExaminationSlips: {
        ...medicalExaminationSlips,
        docs: pojoMedicalExaminationSlips,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách khách hàng: " + error.message,
    });
  }
};

export const createMedicalExaminationSlip = async (req, res) => {
  try {
    // Kiểm tra xem có mã ID được cung cấp hay không
    let examinationId = req.body._id;
    const customerId = req.body.customerId;
    if (!examinationId || examinationId === "") {
      // Nếu không có mã ID, tạo mã mới bằng cách kết hợp mã KH và mã tự sinh
      const timestamp = new Date().getTime();
      examinationId = "PK" + timestamp.toString();
    } else {
      const isExiting = await MedicalExaminationSlip.findById(examinationId);
      if (isExiting) {
        return res.status(403).json({
          message: "Mã bệnh nhân đã tồn tại",
        });
      }
    }
    const { error } = medicineExaminationSlipValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(401).json({
        message: error.details[0].message,
      });
    }
    const customerData = await Customer.findById(customerId);
    const customer = {
      _id: customerData._id,
      name: customerData.name,
      phone: customerData.phone,
    };
    if (req.body.status == "recetion") {
      const examination = await MedicalExaminationSlip.create({
        ...req.body,
        customer,
        id: examinationId,
      });

      await Customer.findByIdAndUpdate(customerId, {
        $addToSet: { examination_history: examination._id },
      });

      const services = req.body.examinationServiceId;
      for (let i = 0; i < services?.length; i++) {
        const lastRecord = await ServiceByExamination.findOne().sort({
          _id: -1,
        });
        let newId = generateNextId(lastRecord ? lastRecord._id : null, "DVK");
        const serviceByExamination = new ServiceByExamination({
          examinationId: examination._id,
          service_examination: services[i],
          doctorId: req.body.doctorId,
          customerId: req.body.customerId,
          staffId: req.body.staffId,
          clinicId: req.body.clinicId,
          id: newId,
          paymentStatus: req.body.paymentStatus,
        });
        await serviceByExamination.save();
      }
      return res.json({
        message: "Tạo phiếu khám thành công",
        examination,
      });
    } else {
      const examination = await MedicalExaminationSlip.create({
        ...req.body,
        customer,
        id: examinationId,
      });
      await Customer.findByIdAndUpdate(customerId, {
        $addToSet: { examination_history: examination._id },
      });
      return res.json({
        message: "Tạo phiếu khám thành công",
        examination,
      });
    }
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

export const deleteExamination = async (req, res) => {
  try {
    const examination = await MedicalExaminationSlip.findByIdAndRemove(
      req.params.id
    );
    if (!examination) {
      return res.status(404).json({
        message: "Phiếu khám không tồn tại!",
      });
    }
    await Customer.findByIdAndUpdate(examination.customerId, {
      $pull: {
        examination_history: examination._id,
      },
    });
    return res.json({
      message: "Xóa phiếu khám thành công!",
      examination,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa phiếu khám: " + error.message,
    });
  }
};
