import Order from '../Models/Order.js';
import moment from 'moment';
// Tổng doanh thu khám
export const statisticTotalRevenueOrder = async (_, res) => {
  try {
    // query all order
    const getAllOrder = await Order.find();
    let totalAmount = 0;
    for (let i = 0; i < getAllOrder.length; i++) {
      totalAmount += Number(getAllOrder[i].totalAmount);
    }
    return res.status(200).json({
      value: totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};

// Tỉ lệ hủy lịch
export const statisticCancellationRate = async (req, res) => {
  try {
    // query all order
    const getAllOrder = await Order.find();
    const getAllCancelOrder = await Order.find({
      paymentStatus: 'Chưa thanh toán',
      createdAt: {
        $gte: moment(req.body.from).toDate(),
        $lt: moment(req.body.to).toDate(),
      },
    });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: `Đã xảy ra lỗi: ${error.message}`,
    });
  }
};
