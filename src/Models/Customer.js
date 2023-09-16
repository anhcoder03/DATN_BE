import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const CustomerSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Sử dụng kiểu String cho trường _id
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    citizenId: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
CustomerSchema.plugin(mongoosePaginate);
export default mongoose.model("Customer", CustomerSchema);
