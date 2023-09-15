import mongoose from "mongoose";
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Role", roleSchema);
