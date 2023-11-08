import Joi from "joi";

const medicinesSchema = Joi.object({
  medicineId: Joi.string().trim().required().messages({
    "string.empty": "ID thuốc không được để trống!",
    "any.required": "Trường ID thuốc là bắt buộc!",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.empty": "Số lượng thuốc không được để trống!",
    "number.base": "Số lượng thuốc phải là một số!",
    "number.min": "Số lượng thuốc phải lớn hơn 0",
  }),
  price: Joi.number().min(1).required().messages({
    "number.empty": "Giá thuốc không được để trống!",
    "number.base": "Giá thuốc phải là một số!",
    "number.min": "Giá thuốc phải lớn hơn 0",
  }),
});

const PrescriptionValidate = Joi.object({
  _id: Joi.string(),
  doctorId: Joi.string().trim().required().messages({
    "string.empty": "ID Bác sĩ không được để trống!",
    "any.required": "Trường ID Bác sĩ là bắt buộc!",
  }),
  medicalExaminationSlipId: Joi.string().trim().required().messages({
    "string.empty": "ID Phiếu khám không được để trống!",
    "any.required": "Trường ID Phiếu khám là bắt buộc!",
  }),
  diagnostic: Joi.string().empty(Joi.allow()).trim(),
  advice: Joi.string().empty(Joi.allow()).trim(),
  reExaminationDate: Joi.date().empty(Joi.allow()),
  medicines: Joi.array().ordered(medicinesSchema).min(1).required().messages({
    "array.base": "Trường Thuốc phải là 1 mảng!",
    "array.min": "Thuốc không được ít hơn {{#limit}}!",
    "any.required": "Trường Thuốc là bắt buộc!",
  }),
  totalAmount: Joi.number().min(1).required().messages({
    "number.empty": "Thành tiền không được để trống!",
    "number.base": "Thành tiền phải là một số!",
    "number.min": "Thành tiền phải lớn hơn 0",
  }),
  paymentStatus: Joi.string().trim().required().messages({
    "string.empty": "Trạng thái Đơn thuốc không được để trống!",
    "any.required": "Trường Trạng thái Đơn thuốc là bắt buộc!",
  }),
  paymentMethod: Joi.string().trim().required().messages({
    "string.empty": "Phương thức thanh toán không được để trống!",
    "any.required": "Trường Phương thức thanh toán là bắt buộc!",
  }),
  note: Joi.string().empty(Joi.allow()).trim(),
});

export default PrescriptionValidate;
