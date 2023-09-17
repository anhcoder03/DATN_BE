import Joi from "joi";

const addressSchema = Joi.object({
  province: Joi.string().trim().required().messages({
    "string.empty": "Trường Tỉnh không được để trống",
  }),
  district: Joi.string().trim().required().messages({
    "string.empty": "Trường Huyện không được để trống",
  }),
  commune: Joi.string().trim().required().messages({
    "string.empty": "Trường Xã không được để trống",
  }),
  detailedAddress: Joi.string().trim().required().messages({
    "string.empty": "Trường Địa chỉ chi tiết không được để trống",
  }),
});

const customerValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().trim().required().messages({
    "string.empty": "Tên khách hàng không được để trống",
  }),
  address: addressSchema.required().messages({
    "object.base": "Địa chỉ là một đối tượng bắt buộc",
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
});

export default customerValidate;