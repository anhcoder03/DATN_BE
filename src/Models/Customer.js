import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const addressSchema = new mongoose.Schema({
  province: String,
  district: String,
  commune: String,
  detailedAddress: String,
});

const CustomerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    address: addressSchema,
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
