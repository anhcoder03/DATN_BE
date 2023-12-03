import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ServiceByExaminationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    examinationId: {
      type: String,
      ref: "MedicalExaminationSlip",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paymentMethod: {
      type: Number,
      enum: [1, 2], // ["Chuyển khoản", "Tiền mặt"]
    },
    service_examination: {
      type: String,
      ref: "Service",
    },
    mainResults: {
      // keets qua
      type: String,
      default: null,
    },
    fileResult: [
      {
        url: String,
      },
    ],
    doctorId: {
      // bác sĩ khám
      type: String,
      ref: "User",
    },
    customerId: {
      type: String,
      ref: "Customer",
    },
    staffId: {
      // nhân viên tiếp đón | người tạo phiếu
      type: String,
      ref: "User",
    },
    clinicId: {
      // phòng khám
      type: String,
      ref: "Clinic",
    },
    status: {
      type: String,
      enum: ["waiting", "running", "done", "canceled"],
      default: "waiting",
    },
    day_run: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

ServiceByExaminationSchema.plugin(mongoosePaginate);
export default mongoose.model(
  "ServiceByExamination",
  ServiceByExaminationSchema
);
