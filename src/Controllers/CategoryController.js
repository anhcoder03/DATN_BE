import categoryValidate from "../Schemas/CategorySchema.js";
import Category from "../Models/CategoryModel.js";
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const addCategory = async (req, res) => {
  try {
    const { error } = categoryValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    //kiem tra ten danh muc co ton tai trong CSDL hay chua
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Tên danh mục đã tồn tại trong cơ sở dữ liệu",
      });
    }

    const category = await Category.create(req.body);
    return res.json({
      message: "Thêm tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại",
      });
    }
    return res.json({
      message: "Xóa tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      category,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
