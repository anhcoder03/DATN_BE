import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const PrescriptionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    doctorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    customerId: {
      type: String,
      ref: "Customer",
    },
    staffId: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán", "Đã hủy"],
      default: "Chưa thanh toán",
    },
    paymentMethod: {
      type: String,
      enum: ["Chuyển khoản", "Tiền mặt"],
      default: "Tiền mặt",
    },
    // notes: {
    //   type: String,
    //   default: "Không có ghi chú",
    // },
  },
  { versionKey: false, timestamps: true }
);

PrescriptionSchema.index({
  id: "text",
  customerId: "text",
});
PrescriptionSchema.plugin(mongoosePaginate);
export default mongoose.model("Prescription", PrescriptionSchema);
