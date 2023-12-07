import ServiceByExamination from "../Models/ServiceByExamination.js";

export const getAllByIdExamination = async (req, res) => {
  try {
    // const {
    //   _page = 1,
    //   _limit = 10,
    //   _sort = "createdAt",
    //   _order = "asc",
    //   status,
    //   search,
    //   doctorId,
    //   staffId,
    //   clinicId,
    // } = req.query;
    // let query = {};
    const options = {
      // page: _page,
      // limit: _limit,

      // sort: {
      //   [_sort]: _order === "asc" ? 1 : -1,
      // },
      populate: [
        {
          path: "customerId",
          select: "name phone _id dateOfBirth gender email note",
        },
        { path: "doctorId", select: "name " },
        { path: "staffId", select: "name " },
        { path: "clinicId" },
        { path: "service_examination" },
      ],
    };
    const serviceByExaminations = await ServiceByExamination.paginate(
      { examinationId: req.params.id },
      options
    );
    return res.json({
      message: "Lấy danh sách phiếu khám thành công!",
      serviceByExaminations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách khách hàng: " + error.message,
    });
  }
};

export const getAllServiceByExamination = async (req, res) => {
  try {
    const {
      _limit = 25,
      _page = 1,
      _sort = "createdAt",
      _order = "desc",
      search,
      status,
      paymentStatus,
      doctorId,
      staffId,
      clinicId,
      createdAt,
    } = req.query;
    let query = {};

    const searchRegex = new RegExp(search, "i");
    if (search && search.trim() !== "") {
      query._id = { $regex: searchRegex };
    }
    if (doctorId) {
      query.doctorId = doctorId;
    }
    if (staffId) {
      query.staffId = staffId;
    }
    if (clinicId) {
      query.clinicId = clinicId;
    }
    if (status) {
      query.status = status;
    }
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }
    if (createdAt) {
      query.createdAt = createdAt;
    }
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "asc" ? 1 : -1,
      },
      populate: [
        { path: "customerId" },
        { path: "doctorId", select: "name" },
        { path: "staffId", select: "name" },
        { path: "service_examination" },
        { path: "clinicId" },
      ],
    };

    const serviceByExaminations = await ServiceByExamination.paginate(
      query,
      options
    );
    return res.status(200).json({
      message: "Lấy tài nguyên thành công !",
      serviceByExaminations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi: " + error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const designation = await ServiceByExamination.findById(
      req.params.id
    ).populate([
      { path: "customerId" },
      { path: "doctorId", select: "name" },
      { path: "staffId", select: "name" },
      { path: "service_examination" },
      { path: "clinicId" },
    ]);
    if (!designation) {
      return res.status(400).json({
        message: "Dịch vụ phiếu khám không tồn tại!",
      });
    }
    return res.json({
      message: "Lấy dịch vụ phiếu khám thành công!",
      designation,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteServiceByExam = async (req, res) => {
  try {
    const designation = await ServiceByExamination.findByIdAndRemove(
      req.params.id
    );
    if (!designation) {
      return res.status(404).json({
        message: "Dịch vụ khám không tồn tại!",
      });
    }
    return res.json({
      message: "Xóa dịch vụ khám thành công!",
      designation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa phiếu khám: " + error.message,
    });
  }
};

export const updateServiceByExam = async (req, res) => {
  try {
    const id = req.params.id;

    const designation = await ServiceByExamination.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (!designation) {
      return res.status(400).json({
        message: "Tài nguyên không tồn tại!",
      });
    }
    return res.json({
      message: "Cập nhật thành công!",
      designation,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const updateServiceByIdExamination = async (req, res) => {
  try {
    const idExam = req.params.id;
    const designation = await ServiceByExamination.find({
      examinationId: idExam,
    });
    for (let i = 0; i < designation.length; i++) {
      await ServiceByExamination.findByIdAndUpdate(designation[i].id, req.body);
    }
    return res.json({
      message: "Cập nhật thành công !",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
