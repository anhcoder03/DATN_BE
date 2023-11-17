import NotifyToken from "../Models/NotifyToken.js";
import { sendMessageToDevices } from "../sendMessageToDevices.js";

export const createNotifyToken = async (req, res) => {
  try {
    const notifyToken = await NotifyToken.create(req.body);
    return res.status(200).json({
      message: "Tạo token thành công!",
      notifyToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAllToken = async (req, res) => {
  try {
    const notifyTokens = await NotifyToken.find({});

    if (!notifyTokens.length) {
      return res.status(400).json({
        message: "Danh sách token trống!",
      });
    }
    const registrationTokens = notifyTokens.map(
      (tokenObj) => tokenObj.notifyToken
    );
    return res.status(200).json({
      message: "Lấy danh sách token thành công!",
      registrationTokens,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getNotifyTokens = async (req, res) => {
  try {
    const notifyTokens = await NotifyToken.find({});

    if (!notifyTokens.length) {
      return [];
    }
    const registrationTokens = notifyTokens.map(
      (tokenObj) => tokenObj.notifyToken
    );
    return registrationTokens;
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
