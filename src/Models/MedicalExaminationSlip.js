import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const MedicalExaminationSlipSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      ref: "Customer",
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    symptom: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Chờ khám", "Đang khám", "Đã huỷ", "Hoàn Thành"],
      default: "Chờ khám",
    },
    staffId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    examinationServiceId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Service",
      },
    ],
    clinicId: {
      type: mongoose.Types.ObjectId,
      ref: "Clinic",
    },
    examinationInvoiceId: {
      type: mongoose.Types.ObjectId,
      ref: "Clinic",
      default: null,
    },
    examinationResults: {
      type: String,
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
