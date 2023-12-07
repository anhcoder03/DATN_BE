import Service from "../Models/Service.js";
import serviceValidate from "../Schemas/Service.js";
import generateNextId from "../Utils/generateNextId.js";

export const getAllService = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "asc",
    search,
    _status,
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? 1 : -1,
    },
  };

  try {
    let query = {};
    if (search && search.trim() !== "") {
      query.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { serviceId: search },
      ];
    }
    if (_status) {
      query.status = _status;
    }

    const services = await Service.paginate(query, options);
    return res.json({
      message: "Lấy tài nguyên thành công!",
      services,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneService = async (req, res) => {
  try {
    const services = await Service.findById(req.params.id);
    if (!services) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Lấy tài nguyên thành công !",
      services,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const addService = async (req, res) => {
  try {
    const { error } = serviceValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errArr,
      });
    }

    const existingService = await Service.findOne({ name: req.body.name });
    if (existingService) {
      return res.status(400).json({
        message: "Tên dịch vụ khám đã tồn tại trong cơ sở dữ liệu",
      });
    }
    const price = parseFloat(req.body.price);
    if (price < 0) {
      return res.status(400).json({
        message: "Giá phải là một số dương lớn hơn 0",
      });
    }

    const lastService = await Service.findOne({}, {}, { sort: { _id: -1 } });
    const serviceId = generateNextId(
      lastService ? lastService.serviceId : null,
      "DV"
    );

    const services = await Service.create({
      ...req.body,
      serviceId,
    });

    return res.json({
      message: "Thêm tài nguyên thành công !",
      services,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    // validate form
    const { error } = serviceValidate.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errArr = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errArr,
      });
    }

    const services = await Service.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!services) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại !",
      });
    }
    return res.json({
      message: "Update tài nguyên thành công !",
      services,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const deleteService = async (req, res) => {
  try {
    const services = await Service.findByIdAndRemove(req.params.id);

    if (!services) {
      return res.status(404).json({
        message: "Dịch vụ khám không tồn tại!",
      });
    }
    return res.json({
      message: "Xóa dịch vụ khám thành công!",
      services,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa dịch vụ khám: " + error.message,
    });
  }
};
