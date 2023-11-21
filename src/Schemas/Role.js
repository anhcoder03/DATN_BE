import Joi from "joi";
const roleValidate = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required().trim().messages({
    "string.empty": "Vui lòng nhập tên vai trò",
  }),
  status: Joi.number(),
  description: Joi.string(),
});
export default roleValidate;
