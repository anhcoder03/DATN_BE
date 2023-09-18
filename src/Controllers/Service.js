import Role from "../Models/Role.js";
import Service from "../Models/Service.js";
import serviceValidate from "../Schemas/Service.js";

export const getAllService = async (req, res) => {
    try {
        const { _page = 1, _limit = 10, _sort = "createdAt", _order = "asc" } = req.query
        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "asc" ? 1 : -1,
            }
        }
        const services = await Service.paginate({}, options);
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
            return res.status(401).json({
                message: error.message,
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

        const services = await Service.create(req.body);
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
            return res.status(401).json({
                message: error.message,
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