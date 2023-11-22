import Joi from "joi";
const roleValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập tên vai trò",
  }),
  roleNumber: Joi.number().required().messages({
    "number.empty": "Số vai trò không được để trống!",
    "number.base": "Số vai trò phải là một số!",
  }),
  status: Joi.number(),
  description: Joi.string(),
});
export default roleValidate;
