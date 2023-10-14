import Joi from "joi";
const MedicalExaminationInvoiceValidate = Joi.object({
  _id: Joi.string(),
  medicalExaminationSlipId: Joi.string().trim().required().messages({
    "string.empty": "Phiếu khám bệnh không được để trống!",
    "any.required": "Trường phiếu khám bệnh là bắt buộc!",
  }),
  paymentStatus: Joi.string().trim().required().messages({
    "string.empty": "Trạng thái thanh toán không được để trống!",
    "any.required": "Trường Trạng thái thanh toán là bắt buộc!",
  }),
  paymentMethod: Joi.string().trim().required().messages({
    "string.empty": "Phương thức thanh toán không được để trống!",
    "any.required": "Trường Phương thức thanh toán là bắt buộc!",
  }),
  examinationFee: Joi.number().min(0).messages({
    "number.empty": "Phí khám bệnh không được để trống!",
    "any.required": "Trường Phí khám bệnh là bắt buộc!",
    "number.base": "Phí khám bệnh phải là số!",
    "number.min": "Phí khám bệnh không được nhỏ hơn {{#limit}}!",
  }),
});

export default MedicalExaminationInvoiceValidate;
