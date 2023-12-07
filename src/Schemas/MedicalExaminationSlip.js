import Joi from "joi";
const medicineExaminationSlipValidate = Joi.object({
  _id: Joi.string(),
  customerId: Joi.string().required().trim().messages({
    "string.empty": "ID khách hàng không được để trống",
    "any.required": "Trường ID khách hàng là bắt buộc!",
  }),
  doctorId: Joi.any(),
  // .required().trim().messages({
  //   "string.empty": "ID bác sĩ không được để trống",
  //   "any.required": "Trường ID bác sĩ là bắt buộc!",
  // }),
  symptom: Joi.any(),
  status: Joi.string().required().trim().messages({
    "string.empty": "Trạng thái phiếu khám không được để trống",
    "any.required": "Trường Trạng thái phiếu khám là bắt buộc!",
  }),
  staffId: Joi.string().required().trim().messages({
    "string.empty": "Nhân viên tiếp đón không được để trống",
    "any.required": "Trường Nhân viên tiếp đón là bắt buộc!",
  }),
  clinicId: Joi.string().required().trim().messages({
    "string.empty": "Phòng khám không được để trống",
    "any.required": "Trường Phòng khám là bắt buộc!",
  }),
  day_booking: Joi.date(),
  day_cancel: Joi.date(),
  day_done: Joi.date(),
  day_examination: Joi.date(),
  day_welcome: Joi.date(),
  day_request_cancel: Joi.date(),
  medicalHistory: Joi.any(),
  note: Joi.any(),
  prescriptionId: Joi.any(),
  conclude: Joi.string(),
  diagnostic: Joi.string(),
  advice: Joi.string(),
  treatmentInstructions: Joi.string(),
  waitingCode: Joi.any(),
  cancel_reason: Joi.string(),
  cancel_person: Joi.string(),
  cancel_requester: Joi.string(),
  // paymentStatus: Joi.string(),
  // examinationInvoiceId: Joi.string(),
});
export default medicineExaminationSlipValidate;
