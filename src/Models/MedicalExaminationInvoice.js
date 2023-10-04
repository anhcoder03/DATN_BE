import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const MedicalExaminationInvoiceSchema = Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    medicalExaminationSlipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalExaminationSlip",
    },
    paymentStatus: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán"],
      default: "Chưa thanh toán",
    },
    paymentMethod: {
      type: String,
      enum: ["Tiền mặt", "Chuyển khoản ngân hàng"],
      default: "Tiền mặt",
    },
    examinationFee: Number,
  },
  { versionKey: false, timestamps: true }
);

MedicalExaminationInvoiceSchema.index({
  _id: "text",
  paymentStatus: "text",
  paymentMethod: "text",
});
MedicalExaminationInvoiceSchema.plugin(mongoosePaginate);

export default mongoose.model(
  "MedicalExaminationInvoice",
  MedicalExaminationInvoiceSchema
);
