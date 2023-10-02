import Joi from "joi";
const customerValidate = Joi.object({
  _id: Joi.any(),
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên khách hàng không được để trống",
  }),
  province: Joi.object().required().messages({
    "string.empty": "Trường Tỉnh không được để trống",
  }),
  district: Joi.object().required().messages({
    "string.empty": "Trường Huyện không được để trống",
  }),
  commune: Joi.object().required().messages({
    "string.empty": "Trường Xã không được để trống",
  }),
  detailedAddress: Joi.string().trim().required().messages({
    "string.empty": "Trường Địa chỉ chi tiết không được để trống",
  }),
  phone: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{10}$/)
    .message("Số điện thoại không hợp lệ, phải là 10 chữ số"),
  citizenId: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{9}$|^[0-9]{12}$/)
    .message("Căn cước công dân không hợp lệ. Phải có 9 hoặc 12 chữ số"),
  dateOfBirth: Joi.string().trim().required().messages({
    "string.empty": "Vui lòng nhập ngày sinh",
  }),
  gender: Joi.string().allow("").trim().messages({
    "string.empty": "Trường Giới tính không được để trống",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Please enter a valid email address",
    }),
  note: Joi.any(),
  creator: Joi.string().required(),
  createdAt: Joi.any(),
  updatedAt: Joi.any()
});

export default customerValidate;
