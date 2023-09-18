import Clinics from "../Models/Clinics.js";
import clinicValidate from "../Schemas/Clinics.js";

export const getAllClinic = async (req, res) => {
  try {
    const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc" } = req.query
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      }
    }
    const clinics = await Clinics.paginate({}, options);
    if (!clinics) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      clinics,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneClinic = async (req, res) => {
  try {
    const clinic = await Clinics.findById(req.params.id);
    if (!clinic) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      clinic,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const addClinic = async (req, res) => {
  try {
    const { error } = clinicValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    const existingClinic = await Clinics.findOne({ name: req.body.name });
    if (existingClinic) {
      return res.status(400).json({
        message: "Tên phòng khám đã tồn tại trong cơ sở dữ liệu",
      });
    }
    const clinic = await Clinics.create(req.body);
    return res.json({
      message: "Thêm tài nguyên thành công !",
      clinic,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateClinic = async (req, res) => {
  try {
    const id = req.params.id;
    // validate form
    const { error } = clinicValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(401).json({
        message: error.message,
      });
    }

    const clinic = await Clinics.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!clinic) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      clinic,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinics.findByIdAndRemove(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        message: "Phòng khám không tồn tại!",
      });
    }
    return res.json({
      message: "Xóa phòng khám thành công!",
      clinic,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa dịch vụ khám: " + error.message,
    });
  }
};
