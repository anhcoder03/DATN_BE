import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    extract: {
      type: String,
    },
    price: {
      type: Number,
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
  },
  { versionKey: false, timestamps: true }
);
ServiceSchema.plugin(mongoosePaginate);
export default mongoose.model("Service", ServiceSchema);
