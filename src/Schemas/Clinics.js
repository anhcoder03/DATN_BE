import Joi from "joi";
const clinicValidate = Joi.object({
  _id: Joi.any(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên phòng khám không được để trống",
  }),
  status: Joi.string().required().trim().messages({
    "string.empty": "Trường trạng thái không được để trống",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Mô tả phòng khám không được để trống",
  }),
  createdAt: Joi.any(),
  updatedAt: Joi.any()
});
export default clinicValidate;
