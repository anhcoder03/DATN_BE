import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const NotificationSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    categoryNotification: {
      type: String,
      enum: ["booking", "cancel_schedule", "cancel_examination"], // ["Đặt lịch", "Hủy lich", "Hủy khám"],
    },
    customerId: {
      type: String,
      ref: "Customer",
    },
    examinationId: {
      type: String,
      ref: "MedicalExaminationSlip",
    },
    doctorId: {
      type: String,
      ref: "User",
    },
    customer: {
      _id: String,
      name: String,
      phone: String,
    },
    content: {
      type: String,
      required: true,
    },
    link: String,
    status: {
      type: Number,
      enum: [0, 1], // [0: Chưa đọc, 1: Đã đọc]
    },
  },
  { versionKey: false, timestamps: true }
);

NotificationSchema.plugin(mongoosePaginate);
export default mongoose.model("Notification", NotificationSchema);
