import medicineValidate from "../Schemas/Medicine.js";
import Medicine from "../Models/Medicine.js";
import CategoryModel from "../Models/CategoryModel.js";
const getAllMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.find();
        if(!medicine) {
            return res.status(400).json({
                message: "Sản phẩm không tồn tại!"
            })
        }
        return res.json({
            message: "Lấy sản phẩm thành công!",
            medicine
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const getOneMedicine = async(req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        console.log(medicine);
        if(!medicine) {
            return res.status(400).json({
                message: "Chi tiết sản phẩm không tồn tại!"
            })
        }
        return res.json({
            message: "Lấy chi tiết sản phẩm thành công!",
            medicine
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const createMedicine  = async (req, res) => {
    try {
        const { error} = medicineValidate.validate(req.body, {
            abortEarly: false
        });
        if(error) {
            return res.status(401).json({
                message: error.details[0].message
            })
        }
        // check tồn tại tên sản phẩm
        const existingMedicine = await CategoryModel.findOne({ name: req.body.name });
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
            medicine
        })  
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message,
        })
    }
}

const deleteMedicine = async(req, res) => {
    try {
        const medicine = await Medicine.findByIdAndRemove(req.params.id);
        await CategoryModel.findByIdAndUpdate(medicine.categoryId, {
            $pull: {
              products: medicine._id
            }
          })
        if(!medicine) {
            return res.status(400).json({
                message: "Sản phẩm không tồn tại!"
            })
        }
        return res.json({
            message: "Xoá sản phẩm thành công!",
            medicine
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

const updateMedicine = async (req, res) => {
    try {
      const id = req.params.id;
  
      // validate form
      const { error} = medicineValidate.validate(req.body, {
        abortEarly: false
        });
        if(error) {
            return res.status(401).json({
                message: error.message
            })
        }
        // check tồn tại tên sản phẩm
        const existingMedicine = await CategoryModel.findOne({ name: req.body.name });
        if (existingMedicine) {
            return res.status(400).json({
                message: "Tên sản phẩm đã tồn tại",
            });
        }
  
      const medicine = await Medicine.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (!medicine) {
        return res.status(400).json({
          message: "Sản phẩm không tồn tại !",
        });
      }
      return res.json({
        message: "Update sản phẩm thành công !",
        medicine,
      });
    } catch (error) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  export {getAllMedicine, getOneMedicine, deleteMedicine, createMedicine, updateMedicine}