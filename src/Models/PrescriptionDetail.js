import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const PrescriptionDetailSchema = new Schema(
  {
    prescriptionId: {
      type: String,
      ref: "Prescription",
    },
    medicines: [
      {
        medicineId: {
          type: mongoose.Types.ObjectId,
          ref: "Medicine",
        },
        quantity: Number,
        dosage: String, // Liều lượng thuốc
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

PrescriptionDetailSchema.plugin(mongoosePaginate);
export default mongoose.model("PrescriptionDetail", PrescriptionDetailSchema);
