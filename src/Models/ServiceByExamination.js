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
    service_examination: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
    mainResults: {
      // keets qua
      type: String,
      default: null,
    },
    fileResult: {
      type: String,
      default: null,
    },
    doctorId: {
      // bác sĩ khám
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    customerId: {
      type: String,
      ref: "Customer",
    },
    staffId: {
      // nhân viên tiếp đón | người tạo phiếu
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    clinicId: {
      // phòng khám
      type: String,
      ref: "Clinic",
    },
    status: {
      type: String,
      enum: ["waiting", "done"],
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
