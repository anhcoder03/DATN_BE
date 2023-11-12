import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const roleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: String,
    users: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
roleSchema.plugin(mongoosePaginate);
export default mongoose.model("Role", roleSchema);
