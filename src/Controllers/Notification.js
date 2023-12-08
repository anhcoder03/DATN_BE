import Notification from "../Models/Notification.js";

export const getAllNotification = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createdAt",
    _order = "desc",
    search,
    _status,
    _categoryNotification,
  } = req.query;
  try {
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
    };

    let query = {};
    const searchRegex = new RegExp(search, "i");
    if (search && search.trim() !== "") {
      query.$or = [
        {
          "customer._id": { $regex: searchRegex },
        },
        {
          "customer.name": { $regex: searchRegex },
        },
        {
          "customer.phone": { $regex: searchRegex },
        },
        { _id: { $regex: searchRegex } },
      ];
    }

    if (_status) {
      query.status = _status;
    }
    if (_categoryNotification) {
      query.categoryNotification = _categoryNotification;
    }

    const notifications = await Notification.paginate(query, options);
    if (!notifications || !notifications.docs.length) {
      return res.status(400).json({
        message: "Danh sách Thông báo trống!",
      });
    }
    return res.json({
      message: "Lấy danh sách Thông báo thành công!",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateNotifycation = async (req, res) => {
  const { id } = req.params;
  try {
    const notify = await Notification.findById(id);
    if (!notify) {
      return res.status(404).json({
        message: "Không tìm thấy thông báo cần cập nhật!",
      });
    }
    const notifyUpdated = await Notification.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Cập nhật thông báo thành công!",
      notification: notifyUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
