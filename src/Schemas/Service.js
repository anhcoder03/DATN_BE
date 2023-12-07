import Joi from "joi";
const serviceValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên dịch vụ khám không được để trống",
    "any.required": "Trường Tên dịch vụ khám là bắt buộc!",
  }),
  extract: Joi.string().required().trim().messages({
    "string.empty": "Mô tả dịch vụ khám không được để trống",
    "any.required": "Trường Mô tả dịch vụ khám là bắt buộc!",
  }),
  price: Joi.number().min(1).required().messages({
    "number.empty": "Giá dịch vụ không được để trống!",
    "number.base": "Giá dịch vụ phải là một số!",
    "number.min": "Giá dịch vụ phải lớn hơn 0",
  }),
  status: Joi.number().default(1),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  serviceId: Joi.string(),
});
export default serviceValidate;
