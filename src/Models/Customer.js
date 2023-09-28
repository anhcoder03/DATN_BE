import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const CustomerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    province: {
      created_time: {
        type: String,
      },
      updated_time: {
        type: String,
      },
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      name_en: {
        type: String,
      },
      full_name: {
        type: String,
      },
      full_name_en: {
        type: String,
      },
      code_name: {
        type: String,
      },
      medon_uuid: {
        type: String,
      },
      label: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    district: {
      created_time: {
        type: String,
      },
      updated_time: {
        type: String,
      },
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      name_en: {
        type: String,
      },
      full_name: {
        type: String,
      },
      full_name_en: {
        type: String,
      },
      code_name: {
        type: String,
      },
      medon_uuid: {
        type: String,
      },
      label: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    commune: {
      created_time: {
        type: String,
      },
      updated_time: {
        type: String,
      },
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      name_en: {
        type: String,
      },
      full_name: {
        type: String,
      },
      full_name_en: {
        type: String,
      },
      code_name: {
        type: String,
      },
      medon_uuid: {
        type: String,
      },
      label: {
        type: String,
      },
      value: {
        type: Number,
      },
    },
    detailedAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
    citizenId: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    note: {
      type: String,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

CustomerSchema.plugin(mongoosePaginate);

export default mongoose.model("Customer", CustomerSchema);
