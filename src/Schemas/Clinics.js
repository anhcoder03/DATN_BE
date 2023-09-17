import Joi from "joi";
const clinicValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên phòng khám không được để trống",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Mô tả phòng khám không được để trống",
  }),
});
export default clinicValidate;
