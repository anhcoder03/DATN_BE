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
  dosage: Joi.string().trim().required().messages({
    "string.empty": "Liều lượng không được để trống!",
    "any.required": "Trường Liều lượng là bắt buộc!",
  }),
});

const PrescriptionValidate = Joi.object({
  _id: Joi.string(),
  doctorId: Joi.string().trim().required().messages({
    "string.empty": "ID Bác sĩ không được để trống!",
    "any.required": "Trường ID Bác sĩ là bắt buộc!",
  }),
  customerId: Joi.string().trim().required().messages({
    "string.empty": "ID Khách hàng không được để trống!",
    "any.required": "Trường ID Khách hàng là bắt buộc!",
  }),
  staffId: Joi.string().trim().required().messages({
    "string.empty": "ID Nhân viên không được để trống!",
    "any.required": "Trường ID Nhân viên là bắt buộc!",
  }),
  medicines: Joi.array().ordered(medicinesSchema).min(1).required().messages({
    "array.base": "Trường Thuốc phải là 1 mảng!",
    "array.min": "Liều lượng thuốc không được nhỏ hơn {{#limit}}!",
    "any.required": "Trường Liều lượng thuốc là bắt buộc!",
  }),
  totalAmount: Joi.number().min(1).required().messages({
    "number.empty": "Thành tiền không được để trống!",
    "number.base": "Thành tiền phải là một số!",
    "number.min": "Thành tiền phải lớn hơn 0",
  }),
  status: Joi.string().trim().required().messages({
    "string.empty": "Trạng thái hóa đơn không được để trống!",
    "any.required": "Trường Trạng thái hóa đơn là bắt buộc!",
  }),
  paymentMethod: Joi.string().trim().required().messages({
    "string.empty": "Phương thức thanh toán không được để trống!",
    "any.required": "Trường Phương thức thanh toán là bắt buộc!",
  }),
  // notes: Joi.string().empty(Joi.allow()).trim(),
});

export default PrescriptionValidate;
