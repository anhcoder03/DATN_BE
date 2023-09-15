import Joi from "joi";
const userValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên không được để trống",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email không được để trống",
      "string.email": "Email không đúng định dạng",
    }),
  password: Joi.string().required().trim().messages({
    "string.empty": "Mật khẩu không được để trống",
  }),
  phone: Joi.string()
    .required()
    .pattern(new RegExp("^(0[0-9]+)$"))
    .min(10)
    .max(11)
    .messages({
      "string.empty": "Vui lòng nhập số điện thoại",
      "string.pattern.base": "Số điện thoại không đúng định dạng",
      "string.min": "Số điện thoại phải có ít nhất 10 chữ số",
      "string.max": "Số điện thoại không được vượt quá 11 chữ số",
    }),
  role: Joi.required().messages({
    "string.empty": "Vai trò không được để trống",
  }),
  avatar: Joi.required().messages({
    "string.empty": "Ảnh không được để trống",
  }),
});
export default userValidate;
