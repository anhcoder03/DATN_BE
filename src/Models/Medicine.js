import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const MedicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        // specifications: {
        //     type: String
        // },
        quantity: {
            type: Number
        },
        price_import: {
            type: Number
        },
        price: {
            type: Number
        },
        time: {
            type: String
        },
        ingredient: {
            type: String
        },
        use: {
            type: String
        },
        categoryId: {
          type: mongoose.Types.ObjectId,
          ref: "Category",
        },
    },
    {versionKey: false, timestamps: true}
);
MedicineSchema.plugin(mongoosePaginate);
export default mongoose.model("Medicine", MedicineSchema);