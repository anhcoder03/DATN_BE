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
  dateOfManufacture: Joi.any(),
  dateExpiry: Joi.any(),
  ingredient: Joi.string().required().trim().messages({
    "string.empty": "Thành phần không được để trống!",
  }),
  uses: Joi.string().required().trim().messages({
    "string.empty": "Công dụng không được để trống!",
  }),
  categoryId: Joi.required().messages({
    "string.empty": "Danh mục không được để trống!",
  }),
  // unit_import: Joi.required().messages({
  //   "string.empty": "Đơn vị nhập không được để trống!",
  // }),
  unit_selling: Joi.required().messages({
    "string.empty": "Đơn vị bán không được để trống!",
  }),
  origin: Joi.required().messages({
    "string.empty": "Xuất xứ không được để trống!",
  }),
  how_using: Joi.required().messages({
    "string.empty": "Cách dùng không được để trống!",
  }),
  status: Joi.any(),
  image: Joi.any(),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
});
export default medicineValidate;
