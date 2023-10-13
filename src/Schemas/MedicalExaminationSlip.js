import Joi from "joi";
const medicineExaminationSlipValidate = Joi.object({
  _id: Joi.any(),
  customerId: Joi.string(),
  doctorId: Joi.string().required().messages({
    "string.empty": "Bác sĩ khám không được để trống",
  }),
  symptom: Joi.string().required().messages({
    "string.empty": "Triệu chứng không được để trống",
  }),
  status: Joi.string(),
  staffId: Joi.string().required().messages({
    "string.empty": "Nhân viên tiếp đón không được để trống",
  }),
  examinationServiceId: Joi.array().required().messages({
    "string.empty": "Chọn dịch vụ khám",
  }),
  clinicId: Joi.string().required().messages({
    "string.empty": "Chọn phòng khám",
  }),
  examinationInvoiceId: Joi.string(),
  day_booking: Joi.date(),
  day_cancel: Joi.date(),
  day_done: Joi.date(),
  day_examination: Joi.date(),
  day_welcome: Joi.date(),
  day_request_cancel: Joi.date(),
  mainTestResults: Joi.string(),
  clinicalConclusion: Joi.string(),
  diagnose: Joi.string(),
  advice: Joi.string(),
  medicalHistory: Joi.string(),
  re_examination: Joi.boolean(),
  day_re_examination: Joi.date(),
  note: Joi.string(),
  prescription: Joi.boolean(),
  prescriptionId: Joi.string(),
});
export default medicineExaminationSlipValidate;
