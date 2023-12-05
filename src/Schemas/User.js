import Joi from "joi";
export const userValidate = Joi.object({
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
  password: Joi.string().required().trim().min(6).max(15).messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường Mật khẩu là bắt buộc!",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.max": "Mật khẩu không được vượt quá 15 ký tự",
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
  verifyToken: Joi.any(),
  otpCode: Joi.any(),
});

export const changePasswordValidate = Joi.object({
  _id: Joi.string().required().messages({
    "string.empty": "ID Người dùng không được để trống",
    "any.required": "Trường ID Người dùng là bắt buộc!",
  }),
  password: Joi.string().required().trim().messages({
    "string.empty": "Mật khẩu cũ không được để trống",
    "any.required": "Trường  Mật khẩu cũ là bắt buộc!",
  }),
  newPassword: Joi.string().required().trim().min(6).max(15).messages({
    "string.empty": "Mật khẩu mới không được để trống",
    "any.required": "Trường Mật khẩu mới là bắt buộc!",
    "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    "string.max": "Mật khẩu mới không được vượt quá 15 ký tự",
  }),
});

export const resetPasswordValidate = Joi.object({
  token: Joi.string().required().trim().messages({
    "string.empty": "Mã xác thực không được để trống",
    "any.required": "Trường Mã xác thực là bắt buộc!",
  }),
  newPassword: Joi.string().required().trim().min(6).max(15).messages({
    "string.empty": "Mật khẩu mới không được để trống",
    "any.required": "Trường Mật khẩu mới là bắt buộc!",
    "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    "string.max": "Mật khẩu mới không được vượt quá 15 ký tự",
  }),
});
