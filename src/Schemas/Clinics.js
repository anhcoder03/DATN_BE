import Joi from "joi";
const clinicValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên phòng khám không được để trống",
    "any.required": "Trường Tên phòng khám là bắt buộc!",
  }),
  status: Joi.string().required().trim().messages({
    "string.empty": "Trường Trạng thái không được để trống",
    "any.required": "Trường Trạng thái thuốc là bắt buộc!",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Mô tả phòng khám không được để trống",
    "any.required": "Trường Mô tả phòng khám là bắt buộc!",
  }),
  doctorInClinic: Joi.string().required().trim().messages({
    "string.empty": "Bác sĩ phòng khám không được để trống",
    "any.required": "Trường Bác sĩ phòng khám là bắt buộc!",
  }),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
});
export default clinicValidate;
