import Joi from "joi";
const categoryValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập Tên danh mục",
    "any.required": "Trường Tên danh mục là bắt buộc!",
  }),
  image: Joi.any(),
  products: Joi.any(),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
});
export default categoryValidate;
