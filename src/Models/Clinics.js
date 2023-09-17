import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ClinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
ClinicSchema.plugin(mongoosePaginate);
export default mongoose.model("Clinic", ClinicSchema);
