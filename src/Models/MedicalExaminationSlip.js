import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const MedicalExaminationSlipSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      ref: "Customer",
    },
    customer: {
      _id: {
        type: String,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    doctorId: {
      // bác sĩ khám
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    symptom: {
      //triệu chứng
      type: String,
    },
    status: {
      type: String,
      enum: [
        "booking",
        "recetion",
        "waiting",
        "running",
        "done",
        "cancelling",
        "cancel",
      ],
    },
    staffId: {
      // nhân viên tiếp đón | người tạo phiếu
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    examinationServiceId: [
      {
        type: String,
        ref: "Service",
      },
    ],
    clinicId: {
      // phòng khám
      type: mongoose.Types.ObjectId,
      ref: "Clinic",
    },
    day_welcome: {
      // ngày tiếp đón
      type: String,
      default: null,
    },
    day_booking: {
      type: String,
      default: null,
    },
    day_cancel: {
      // ngay huỷ
      type: String,
      default: null,
    },
    day_done: {
      type: String,
      default: null,
    },
    day_examination: {
      type: String, // ngày khám
      default: null,
    },
    day_request_cancel: {
      type: String, // ngày yêu cầu huỷ
      default: null,
    },
    medicalHistory: {
      // bệnh sử
      type: String,
      default: null,
    },
    note: {
      // ghi chú
      type: String,
      default: null,
    },
    prescriptionId: {
      type: String,
      // ref: ""
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

MedicalExaminationSlipSchema.plugin(mongoosePaginate);
export default mongoose.model(
  "MedicalExaminationSlip",
  MedicalExaminationSlipSchema
);
