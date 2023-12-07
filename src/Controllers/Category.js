import categoryValidate from "../Schemas/Category.js";
import Category from "../Models/Category.js";
import Medicine from "../Models/Medicine.js";
export const getAllCategory = async (req, res) => {
  try {
    const {
      _page = 1,
      _limit = 25,
      _sort = "createdAt",
      _order = "asc",
      search,
    } = req.query;
    let query = {};
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };
    if (search && search.trim() !== "") {
      query.name = { $regex: new RegExp(search, "i") };
    }
    const categories = await Category.paginate(query, options);
    if (!categories) {
      return res.status(400).json({
        message: "Danh sách danh mục trống!",
      });
    }
    return res.json({
      message: "Lấy danh sách danh mục thành công!",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(400).json({
        message: "Danh mục không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy danh mục thành công!",
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
      const errArr = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errArr,
      });
    }

    //kiem tra ten danh muc co ton tai trong CSDL hay chua
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.status(400).json({
        message: "Tên danh mục đã tồn tại!",
      });
    }

    const category = await Category.create(req.body);
    return res.json({
      message: "Thêm danh mục thành công!",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem category có tồn tại không
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục thuốc!",
      });
    }

    // Tìm tất cả thuốc có categoryId trùng với id gửi lên
    const medicines = await Medicine.find({ categoryId: id });

    // Tìm xem đã có danh mục "Uncategorized" chưa
    const uncategorized = await Category.findOne({ name: "Uncategorized" });

    // Nếu có, chuyển tất cả thuốc thuộc danh mục vừa bị xóa vào "Uncategorized"
    if (uncategorized) {
      await Medicine.updateMany(
        { categoryId: id },
        { categoryId: uncategorized._id }
      );

      // Cập nhật id của mảng medicines bên trong danh mục "Uncategorized"
      await Category.findByIdAndUpdate(uncategorized._id, {
        $push: {
          products: {
            $each: medicines.map((medicine) => medicine._id),
          },
        },
      });
    } else {
      // chưa có thì tạo mới 1 danh mục "Uncategorized"
      const newUncategorized = await Category.create({ name: "Uncategorized" });

      await Medicine.updateMany(
        { categoryId: id },
        { categoryId: newUncategorized._id }
      );

      await Category.findByIdAndUpdate(newUncategorized._id, {
        $push: {
          products: {
            $each: medicines.map((medicine) => medicine._id),
          },
        },
      });
    }

    await Category.findByIdAndDelete(id);
    return res.json({
      message: "Xóa danh mục thuốc thành công!",
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

    // validate form
    const { error } = categoryValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = or.errdetails.map((err) => err.message);
      return res.status(401).json({
        message: errArr,
      });
    }

    const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(400).json({
        message: "Danh mục không tồn tại!",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công!",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
