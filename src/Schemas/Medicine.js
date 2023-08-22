import Joi from "joi";
const medicineValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên sản phẩm không được để trống",
  }),
  quantity: Joi.number().required().messages({
    "string.empty": "Số lượng không được để trống"
  }),
  price_import: Joi.number().required().messages({
    "string.empty": "Giá nhập không được để trống"
  }),
  price: Joi.number().required().messages({
    "string.empty": "Giá bán không được để trống"
  }),
  time: Joi.string().required().trim().messages({
    "string.empty": "Thời gian không được để trống"
  }),
  ingredient: Joi.string().required().trim().messages({
    "string.empty": "Thành phần không được để trống"
  }),
  use: Joi.string().required().trim().messages({
    "string.empty": "Công dụng không được để trống"
  }),
  categoryId: Joi.required().messages({
    "string.empty": "Danh mục không được để trống"
  })
});
export default medicineValidate;