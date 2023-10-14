import Joi from "joi";
const StaffValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên nhân viên bán thuốc không được để trống!",
    "any.required": "Trường tên nhân viên bán thuốc là bắt buộc!",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email không hợp lệ!",
      "string.empty": "Email nhân viên bán thuốc không được để trống!",
      "any.required": "Trường email nhân viên bán thuốc là bắt buộc!",
    }),
  phone: Joi.string()
    .required()
    .trim()
    .pattern(/^(\+|0)?[0-9]{10,11}$/)
    .min(10)
    .max(11)
    .messages({
      "string.empty": "Vui lòng nhập số điện thoại nhân viên bác thuốc",
      "string.pattern.base": "Số điện thoại không đúng định dạng",
      "string.min": "Số điện thoại phải có ít nhất 10 chữ số",
      "string.max": "Số điện thoại không được vượt quá 11 chữ số",
    }),
});

export default StaffValidate;
