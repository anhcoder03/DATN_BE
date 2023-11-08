import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const PrescriptionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      ref: "User",
    },
    medicalExaminationSlipId: {
      type: String,
      ref: "MedicalExaminationSlip",
    },
    customer: {
      _id: String,
      name: String,
      phone: String,
    },
    doctor: {
      _id: String,
      name: String,
    },
    diagnostic: String,
    reExaminationDate: String,
    advice: String,
    medicines: [
      {
        medicineId: {
          type: String,
          ref: "Medicine",
        },
        quantity: Number,
        unit_selling: String, // đơn vị xuất kho
        unit_using: String, // đơn vị sử dụng
        dosage: String, // liều dùng
        timesUsePerDay: Number, // số lần sử dụng/ngày
        how_using: String, // cách dùng
        routeOfDrug: String, // đường dùng thuốc
        // price: Number,
      },
    ],
    // totalAmount: Number,
    // paymentStatus: {
    //   type: String,
    //   enum: ["Đã thanh toán", "Chưa thanh toán"],
    //   default: "Chưa thanh toán",
    // },
    // paymentMethod: {
    //   type: String,
    //   enum: ["Chuyển khoản", "Tiền mặt"],
    //   default: "Tiền mặt",
    // },
    note: {
      type: String,
      default: "Không có ghi chú",
    },
  },
  { versionKey: false, timestamps: true }
);

PrescriptionSchema.plugin(mongoosePaginate);
export default mongoose.model("Prescription", PrescriptionSchema);
