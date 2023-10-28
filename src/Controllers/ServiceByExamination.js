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
