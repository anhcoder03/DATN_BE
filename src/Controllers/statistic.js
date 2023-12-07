import ServiceByExamination from "../Models/ServiceByExamination.js";
import MedicalExaminationSlip from "../Models/MedicalExaminationSlip.js";
import Customer from "../Models/Customer.js";
import User from "../Models/User.js";
import moment from "moment";

// Tổng doanh thu khám
export const statisticTotalRevenueOrder = async (_, res) => {
  try {
    // query all order
    const getAllService = await ServiceByExamination.find().populate([
      { path: "service_examination", select: "price" },
    ]);
    let totalAmount = 0;
    let actualAmount = 0;
    for (let i = 0; i < getAllService.length; i++) {
      totalAmount += Number(getAllService[i]?.service_examination?.price);
    }
    for (let i = 0; i < getAllService.length; i++) {
      if (getAllService[i].paymentStatus === "paid") {
        actualAmount += Number(getAllService[i]?.service_examination?.price);
      }
    }
    return res.status(200).json({
      totalAmount, // doanh thu du kien (chua thanh toan va thanh toan)
      actualAmount, // doanh thu thuc te ( da thanh toan)
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// export const totalUsingService = async (req, res) => {
//   try {
//     const services = await Service.find();
//     const serviceByExamination = await ServiceByExamination.find();
//   } catch (error) {
//     return res.status(500).json({
//       message: `Đã xảy ra lỗi: ${error.message}`,
//     });
//   }
// };

// Tỉ lệ hủy lịch
export const statisticCancellationRate = async (req, res) => {
  const { from, to } = req.query;
  try {
    const dataAll = await MedicalExaminationSlip.find({
      day_booking: {
        $gte: moment(from).toDate().toISOString(),
        $lt: moment(to).toDate().toISOString(),
      },
    });
    const dataCancel = dataAll?.filter(
      (i) => i.status === "cancel_schedule" || i.status === "cancel"
    );
    return res.status(200).json({
      data: [
        {
          name: "Tổng số lượng đặt",
          value: dataAll.length,
        },
        {
          name: "Đã hủy",
          value: dataCancel.length,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// Số lượng khách hàng
export const statisticTotalCustomer = async (_, res) => {
  try {
    const totalCustomer = await Customer.count();
    return res.status(200).json({ totalCustomer });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// Số lượng nhân viên
export const statisticTotalUser = async (req, res) => {
  const { from, to } = req.query;
  try {
    const data = await User.find({
      createdAt: {
        $gte: moment(from).toDate(),
        $lt: moment(to).toDate(),
      },
    }).populate([{ path: "role", select: "roleNumber" }]);

    let doctor = 0;
    let reception_staff = 0;
    let medicine_staff = 0;
    for (let i = 0; i < data.length; i++) {
      switch (data[i]?.role?.roleNumber) {
        case 1:
          doctor++;
          break;
        case 2:
          reception_staff++;
          break;
        case 3:
          medicine_staff++;
          break;
        default:
          break;
      }
    }
    return res.status(200).json({
      data: [
        {
          name: "Bác sĩ",
          value: doctor,
        },
        {
          name: "Nhân viên tiếp đón",
          value: reception_staff,
        },
        {
          name: "Nhân viên bán thuốc",
          value: medicine_staff,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};
