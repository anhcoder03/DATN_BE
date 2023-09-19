import Joi from "joi";
const medicineExaminationSlipValidate = Joi.object({
  _id: Joi.string(),
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
  examinationResults: Joi.string(),
});
export default medicineExaminationSlipValidate;
