import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const OrderSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      ref: "User",
    },
    customer: {
      _id: String,
      name: String,
      phone: String,
    },
    prescriptionId: {
      type: String,
      ref: "Prescription",
    },
    medicines: [
      {
        medicineId: {
          type: String,
          ref: "Medicine",
        },
        quantity: Number,
        price: Number,
        totalPrice: Number,
      },
    ],
    orderType: {
      type: String,
      enum: ["Kê đơn", "Bán tại cửa hàng"],
      default: "Bán tại cửa hàng",
    },
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ["Đã thanh toán", "Chưa thanh toán"],
      default: "Chưa thanh toán",
    },
    paymentMethod: {
      type: String,
      enum: ["Chuyển khoản", "Tiền mặt"],
      default: "Tiền mặt",
    },
    status: {
      type: String,
      enum: ["Đang chờ xử lý", "Hoàn thành", "Đã hủy"],
      default: "Đang chờ xử lý",
    },
    note: {
      type: String,
      default: "Không có ghi chú",
    },
  },
  { versionKey: false, timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
export default mongoose.model("Order", OrderSchema);
