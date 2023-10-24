import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Medicine",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
categorySchema.plugin(mongoosePaginate);
export default mongoose.model("Category", categorySchema);
