import Joi from "joi";
const citizenIdRegex = /^[0-9]{9}$|^[0-9]{12}$/;

const customerValidate = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required().trim().messages({
        "string.empty": "Tên khách hàng không được để trống",
    }),
    address: Joi.string().required().trim().messages({
        "string.empty": "Địa chỉ không được để trống",
    }),
    phone: Joi.string()
        .required()
        .trim()
        .pattern(/^[0-9]{10}$/)
        .message("Số điện thoại không hợp lệ, phải là 10 chữ số"),
    citizenId: Joi.string()
        .required()
        .trim()
        .pattern(citizenIdRegex)
        .message("Căn cước công dân không hợp lệ. Phải có 9 hoặc 12 chữ số"),
    dateOfBirth: Joi.string().required().trim().messages({
        "string.empty": "Vui lòng nhập ngày sinh",
    }),
    gender: Joi.string().allow("").trim().messages({
        "string.empty": "Công dụng không được để trống",
    }),
});

export default customerValidate;
