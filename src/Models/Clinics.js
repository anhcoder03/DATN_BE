import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ClinicSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "stop"],
    },
    description: {
      type: String,
    },
    doctorInClinic: {
      type: String,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);
ClinicSchema.plugin(mongoosePaginate);
export default mongoose.model("Clinic", ClinicSchema);
