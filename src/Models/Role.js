import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    roleNumber: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4], // enum: [0: "Admin", 1: "Bác sĩ", 2: "Nhân viên tiếp đón", 3: "Nhân viên bán hàng", 4: "Người dùng thường(Khách hàng)"]
    },
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
    status: {
      type: Number,
      enum: [0, 1], //[0: Không hoạt động, 1: Hoạt động]
      default: 1,
    },
    description: String,
  },
  { versionKey: false, timestamps: true }
);
roleSchema.plugin(mongoosePaginate);
export default mongoose.model("Role", roleSchema);
