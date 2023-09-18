import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
userSchema.plugin(mongoosePaginate)
export default mongoose.model("User", userSchema);
