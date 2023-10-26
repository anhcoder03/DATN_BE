import Joi from "joi";
const serviceValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên dịch vụ khám không được để trống",
  }),
  extract: Joi.string().required().trim().messages({
    "string.empty": "Mô tả dịch vụ khám không được để trống",
  }),
  price: Joi.number().required().messages({
    "any.required": "Giá dịch vụ không được để trống",
    "number.base": "Giá dịch vụ phải là số",
  }),
  status: Joi.number().default(1),
});
export default serviceValidate;
