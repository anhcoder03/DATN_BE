import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const StaffSchema = new Schema(
  {
    name: String,
    email: String,
    phone: Number,
  },
  { versionKey: false, timestamps: true }
);

StaffSchema.index({
  name: "text",
  email: "text",
  phone: "text",
});
StaffSchema.plugin(mongoosePaginate);
export default mongoose.model("Staff", StaffSchema);
