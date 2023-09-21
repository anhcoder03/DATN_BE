import Joi from "joi";
const medicineValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên sản phẩm không được để trống!",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.empty": "Số lượng không được để trống!",
    "number.base": "Số lượng phải là một số!",
    "number.min": "Số lượng phải lớn hơn 0",
  }),
  price_import: Joi.number().min(1).required().messages({
    "number.empty": "Giá nhập không được để trống!",
    "number.base": "Giá nhập phải là một số!",
    "number.min": "Giá nhập phải lớn hơn 0",
  }),
  price: Joi.number().min(1).required().messages({
    "number.empty": "Giá bán không được để trống!",
    "number.base": "Giá bán phải là một số!",
    "number.min": "Giá bán phải lớn hơn 0",
  }),
  time: Joi.string()
    .pattern(new RegExp(/^\d{2}\/\d{2}\/\d{4}$/))
    .required()
    .trim()
    .messages({
      "string.empty": "Thời gian không được để trống!",
      "string.pattern.base":
        "Thời gian phải có định dạng DD/MM/YYYY (VD: 22/09/2023)",
    }),
  ingredient: Joi.string().required().trim().messages({
    "string.empty": "Thành phần không được để trống!",
  }),
  use: Joi.string().required().trim().messages({
    "string.empty": "Công dụng không được để trống!",
  }),
  categoryId: Joi.required().messages({
    "string.empty": "Danh mục không được để trống!",
  }),
});
export default medicineValidate;
