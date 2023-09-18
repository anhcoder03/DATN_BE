import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const CustomerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    commune: {
      type: String,
    },
    detailedAddress: {
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
