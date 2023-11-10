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
  unit_selling: Joi.string().trim().required().messages({
    "string.empty": "Vui lòng chọn Đơn vị xuất kho!",
    "any.required": "Trường Đơn vị xuất kho là bắt buộc!",
  }),
  unit_using: Joi.string().trim().required().messages({
    "string.empty": "Vui lòng chọn Đơn vị sử dụng!",
    "any.required": "Trường Đơn vị sử dụng là bắt buộc!",
  }),
  dosage: Joi.string().empty(Joi.allow()).trim().default("---"),

  how_using: Joi.string().empty(Joi.allow()).trim().default("---"),
  timesUsePerDay: Joi.number().min(1).required().messages({
    "number.empty": "Số lần sử dụng trong ngày không được để trống!",
    "number.base": "Số lần sử dụng trong ngày phải là một số!",
    "number.min": "Số lần sử dụng trong ngày phải lớn hơn 0",
  }),
  routeOfDrug: Joi.string().trim().required().messages({
    "string.empty": "Vui lòng chọn Đường dùng thuốc!",
    "any.required": "Trường Đường dùng thuốc là bắt buộc!",
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
  medicines: Joi.array().items(medicinesSchema).min(1).required().messages({
    "array.base": "Trường Thuốc phải là 1 mảng!",
    "array.min": "Thuốc không được ít hơn {{#limit}}!",
    "any.required": "Trường Thuốc là bắt buộc!",
  }),
  status: Joi.number().default(0),
  note: Joi.string().empty(Joi.allow()).trim(),
});

export default PrescriptionValidate;
