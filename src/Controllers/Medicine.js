import medicineValidate from "../Schemas/Medicine.js";
import Medicine from "../Models/Medicine.js";
import CategoryModel from "../Models/Category.js";
const getAllMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find();
    if (!medicine) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công!",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const getOneMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(400).json({
        message: "Chi tiết sản phẩm không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy chi tiết sản phẩm thành công!",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const createMedicine = async (req, res) => {
  try {
    const { error } = medicineValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(401).json({
        message: error.details[0].message,
      });
    }
    // check tồn tại tên sản phẩm
    const existingMedicine = await CategoryModel.findOne({
      name: req.body.name,
    });
    if (existingMedicine) {
      return res.status(400).json({
        message: "Tên sản phẩm đã tồn tại",
      });
    }
    const medicine = await Medicine.create(req.body);
    await CategoryModel.findByIdAndUpdate(medicine.categoryId, {
      $addToSet: { products: medicine._id },
    });
    return res.json({
      message: "Thêm sản phẩm thành công",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndRemove(req.params.id);
    await CategoryModel.findByIdAndUpdate(medicine.categoryId, {
      $pull: {
        products: medicine._id,
      },
    });
    if (!medicine) {
      return res.status(400).json({
        message: "Sản phẩm không tồn tại!",
      });
    }
    return res.json({
      message: "Xoá sản phẩm thành công!",
      medicine,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, categoryId } = req.body;

    // validate form
    const { error } = medicineValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }
    // check tồn tại tên sản phẩm
    const existingMedicine = await CategoryModel.findOne({
      name: name,
    });
    if (existingMedicine) {
      return res.status(400).json({
        message: "Tên thuốc đã tồn tại",
      });
    }

    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({
        message: "Thuốc không tồn tại !",
      });
    }

    // Check xem danh mục mới có tồn tại không
    const newCategory = await CategoryModel.findById(categoryId);
    if (!newCategory) {
      return res.status(404).json({
        message: "Danh mục mới không tồn tại!",
      });
    }

    // Lấy danh mục cũ của thuốc
    const oldCategory = await CategoryModel.findById(medicine.categoryId);

    // Nếu danh mục cũ tồn tại, chuyển thuốc ở danh mục cũ sang danh mục mới
    if (oldCategory) {
      // Xóa id thuốc khỏi danh mục cũ
      oldCategory.products.pull(id);
      await oldCategory.save();

      // Thêm id thuốc vào danh mục mới
      newCategory.products.push(id);
      await newCategory.save();
    }

    // Cập nhật thuốc
    const medicineUpdated = await Medicine.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!medicineUpdated) {
      return res.status(400).json({
        message: "Cập nhật thông tin thuốc thất bại!",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thông tin thuốc thành công !",
      medicine: medicineUpdated,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export {
  getAllMedicine,
  getOneMedicine,
  deleteMedicine,
  createMedicine,
  updateMedicine,
};