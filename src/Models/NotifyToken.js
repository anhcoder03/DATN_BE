import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const NotifyTokenSchema = new Schema(
  {
    notifyToken: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

NotifyTokenSchema.plugin(mongoosePaginate);
export default mongoose.model("NotifyToken", NotifyTokenSchema);
