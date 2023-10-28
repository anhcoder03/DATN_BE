import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price_import: {
      // giá nhập
      type: Number,
    },
    price: {
      //giá bán
      type: Number,
    },
    dateOfManufacture: {
      // ngày sản xuất
      type: String,
    },
    dateExpiry: {
      // ngày hết hạn
      type: String,
    },
    uses: {
      // công dụng
      type: String,
    },
    // unit_import: {
    //   // đơn vị nhập
    //   type: String,
    // },
    unit_selling: {
      // đơn vị bán
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    origin: {
      // xuất xứ
      type: String,
    },
    ingredient: {
      // thành phần
      type: String,
    },
    how_using: {
      // cách dùng
      type: String,
    },
    status: {
      type: String,
      enum: ["hidden", "work", "empty"], // ["ẩn", "hoạt động", "hết hàng"]
    },
    image: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
MedicineSchema.plugin(mongoosePaginate);
export default mongoose.model("Medicine", MedicineSchema);
