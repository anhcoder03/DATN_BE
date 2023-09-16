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
            type: Number
        }
    },
    { versionKey: false, timestamps: true }
);
ServiceSchema.plugin(mongoosePaginate);
export default mongoose.model("Service", ServiceSchema);
