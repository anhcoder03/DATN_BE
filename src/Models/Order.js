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
      ref: "Customer",
    },
    customer: {
      _id: String,
      name: String,
      phone: String,
    },
    sellerId: {
      type: String,
      ref: "User",
    },
    prescriptionId: {
      type: String,
      ref: "Prescription",
      default: null,
    },
    medicines: [
      {
        medicineId: {
          type: String,
          ref: "Medicine",
        },
        quantity: Number,
        price: Number,
      },
    ],

    orderType: {
      type: Number,
      enum: [0, 1], // ["Kê đơn", "Bán tại cửa hàng"],
      default: 0,
    },
    totalAmount: Number,
    paymentStatus: {
      type: Number,
      enum: [0, 1], // ["Đã thanh toán", "Chưa thanh toán"],
      default: 0,
    },
    paymentMethod: {
      type: Number,
      enum: [1, 2], // ["Chuyển khoản", "Tiền mặt"]
    },
    status: {
      type: Number,
      enum: [0, 1, 2], //["Đang chờ xử lý", "Hoàn thành", "Đã hủy"],
      default: 0,
    },
    note: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
export default mongoose.model("Order", OrderSchema);
