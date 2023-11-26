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

const OrderValidate = Joi.object({
  _id: Joi.string(),
  customerId: Joi.string().trim().required().messages({
    "string.empty": "ID Khách hàng không được để trống!",
    "any.required": "Trường ID Khách hàng là bắt buộc!",
  }),
  sellerId: Joi.string().trim().required().messages({
    "string.empty": "ID Người tạo không được để trống!",
    "any.required": "Trường ID Người tạo là bắt buộc!",
  }),
  medicines: Joi.array().items(medicinesSchema).min(1).required().messages({
    "array.base": "Trường Thuốc phải là 1 mảng!",
    "array.min": "Thuốc không được ít hơn {{#limit}}!",
    "any.required": "Trường Thuốc là bắt buộc!",
  }),
  orderType: Joi.number().required().messages({
    "number.empty": "Loại Đơn hàng không được để trống!",
    "any.required": "Trường Loại Đơn hàng là bắt buộc!",
  }),
  totalAmount: Joi.number().min(1).required().messages({
    "number.empty": "Tổng thành tiền không được để trống!",
    "number.base": "Tổng thành tiền phải là một số!",
    "number.min": "Tổng thành tiền phải lớn hơn 0",
  }),
  paymentStatus: Joi.number().required().messages({
    "number.empty": "Trạng thái thanh toán không được để trống!",
    "any.required": "Trạng thái thanh toán là bắt buộc!",
    "any.only": "Trạng thái thanh toán không hợp lệ!",
  }),
  paymentMethod: Joi.number().required().messages({
    "number.empty": "Phương thức thanh toán không được để trống!",
    "any.required": "Phương thức thanh toán là bắt buộc!",
    "any.only": "Phương thức thanh toán không hợp lệ!",
  }),
  status: Joi.number().required().messages({
    "number.empty": "Trạng thái Đơn hàng không được để trống!",
    "any.required": "Trạng thái Đơn hàng là bắt buộc!",
    "any.only": "Trạng thái Đơn hàng không hợp lệ!",
  }),
  note: Joi.string().empty(Joi.allow()).trim(),
});

export default OrderValidate;
