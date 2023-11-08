import MedicalExaminationSlip from "../Models/MedicalExaminationSlip.js";
import User from "../Models/User.js";
import Prescription from "../Models/Prescription.js";
import PrescriptionValidate from "../Schemas/Prescription.js";
import generateNextId from "../Utils/generateNextId.js";

// get all Prescription
export const getAllPrescription = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    search,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "asc" ? 1 : -1,
    },
    populate: [
      { path: "doctorId" },
      { path: "medicalExaminationSlipId" },
      { path: "medicines.medicineId" },
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
        { medicalExaminationSlipId: { $regex: searchRegex } },
        { _id: { $regex: searchRegex } },
        { doctorId: { $regex: searchRegex } },
      ];
    }

    const prescriptions = await Prescription.paginate(query, options);

    if (!prescriptions || prescriptions.docs.length === 0) {
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
      .populate("medicines.medicineId");

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
      req.body.medicalExaminationSlipId
    );
    if (medicalExaminationSlip && medicalExaminationSlip.customer) {
      customer = medicalExaminationSlip.customer;
    }

    // create doctor
    let doctor = "";
    const user = await User.findById(req.body.doctorId);
    if (user) {
      doctor = {
        _id: user._id,
        name: user.name,
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
        message: "Không có dữ liệu Kê đơn để cập nhật!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật Kê đơn thành công!",
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

    await Prescription.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Xóa Đơn thuốc thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}!`,
    });
  }
};
