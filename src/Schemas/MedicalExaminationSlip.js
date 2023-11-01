import Joi from "joi";
const medicineExaminationSlipValidate = Joi.object({
  _id: Joi.any(),
  customerId: Joi.string(),
  doctorId: Joi.any(),
  symptom: Joi.any(),
  status: Joi.string(),
  staffId: Joi.any(),
  clinicId: Joi.any(),
  examinationInvoiceId: Joi.string(),
  day_booking: Joi.date(),
  day_cancel: Joi.date(),
  day_done: Joi.date(),
  day_examination: Joi.date(),
  day_welcome: Joi.date(),
  day_request_cancel: Joi.date(),
  medicalHistory: Joi.any(),
  note: Joi.any(),
  prescriptionId: Joi.string(),
  paymentStatus: Joi.string(),
});
export default medicineExaminationSlipValidate;
