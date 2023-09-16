import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
    },
  },
  { versionKey: false, timestamps: true }
);
export default mongoose.model("User", userSchema);
