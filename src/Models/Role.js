import mongoose from "mongoose";
const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("Role", roleSchema);
