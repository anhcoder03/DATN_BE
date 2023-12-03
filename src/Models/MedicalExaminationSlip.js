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
      type: String,
      ref: "User",
    },
    waitingCode: {
      type: Number,
      default: 1,
    },

    symptom: {
      //triệu chứng
      type: String,
    },
    status: {
      type: String,
      enum: [
        "booking", // Đặt Lịch khám
        "recetion", // Tiếp đón
        "waiting", // Chờ khám
        "running", // Đang khám
        "done", // Đã khám
        "cancel", // Hủy khám
        "cancel_schedule", // Hủy lịch
      ],
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
    day_running: {
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
    //két quả
    conclude: {
      type: String,
      default: null,
    },
    // chuẩn đoán
    diagnostic: {
      type: String,
      default: null,
    },
    //dặn dò
    advice: {
      type: String,
      default: null,
    },
    // hướng dẫn điều trị
    treatmentInstructions: {
      type: String,
      default: null,
    },
    // lý do hủy khám
    cancel_reason: {
      type: String,
      default: null,
    },
    // Người hủy (Nhân viên)
    cancel_person: {
      type: String,
      default: null,
    },
    // Người yêu cầu hủy ( Bác sĩ, khách hàng)
    cancel_requester: {
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
