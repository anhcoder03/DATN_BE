import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Gửi mail khi Đặt lịch khám thành công
export const notifyMailBooking = async (email, date_booking) => {
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Dr.MediPro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: "ĐẶT LỊCH KHÁM THÀNH CÔNG",
    html: /*html*/ `
    <div>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn đã đặt lịch khám thành công tại <span style="color: #48A800;">Phòng Khám Dr.MediPro</span>.</p>
    <p  style="font-size: 16px; color: #002140; font-weight: 600;">Lịch khám của bạn là <span style="color: #f5a742;">${date_booking}</span>. Mời bạn đến phòng khám của chúng tôi đúng hẹn để khám bệnh.</p>
    <p  style="font-size: 16px; color: #002140; font-weight: 600;">Cảm ơn bạn vì đã lựa chọn <span style="color: #48A800;">Dr.MediPro</span>!</p>
    <img src="https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png" alt="MediPro Logo" style="margin-top: 30px"/>
    </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Gửi mail với transporter đã được config xong
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return res.status(400).json({
      message: "An error occurred while sending the email!",
    });
  }

  console.log("Send mail to booking notify succeed!");
};

// Gửi mail khi Khám xong
export const notifyMailExamDone = async (email, examinationId) => {
  const linkToDetail = `${process.env.RECEPTION_LINK}/${examinationId}/view`;
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Dr.MediPro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: "THÔNG TIN KHÁM BỆNH",
    html: /*html*/ `
    <div>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Cảm ơn bạn đã khám bệnh tại <span style="color: #48A800;">Phòng Khám Dr.MediPro</span>!</p>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn có thể nhấn vào nút "Xem thông tin" để xem chi tiết phiếu khám bệnh của bạn: </p>
    <button style="padding: 5px; background-color: #f5a742; border-radius: 5px;"><a href=${linkToDetail} style="font-size: 14px; color: #002140; font-weight: 600; text-decoration: none;">Xem thông tin</a></button>
    <div><img src="https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png" alt="MediPro Logo" style="margin-top: 50px"/></div>
    </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Gửi mail với transporter đã được config xong
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return res.status(400).json({
      message: "An error occurred while sending the email!",
    });
  }

  console.log("Send mail to examination notify succeed!");
};

// Gửi mail tạo mã xác thực
export const generateVerifyTokenMail = async (email, verifyToken) => {
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Dr.MediPro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: "ĐẶT LẠI MẬT KHẨU CỦA BẠN",
    html: /*html*/ `
    <div>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn đang thực hiện chức năng "Quên mật khẩu", vui lòng nhập mã xác thực dưới đây để đặt lại mật khẩu của bạn. Lưu ý mã này sẽ hết hạn sau 1 phút.</p>
    <button style=" padding: 8px 10px; background-color: #48A800; font-size: 18px; border: none; color: #FFF; font-weight: 700; user-select: text;">${verifyToken}</button>
    <div><img src="https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png" alt="MediPro Logo" style="margin-top: 50px"/></div>
    </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Gửi mail với transporter đã được config xong
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return res.status(400).json({
      message: "An error occurred while sending the email!",
    });
  }

  console.log("Send mail to generate verify token succeed!");
};

// Gửi mail khi đã đổi mật khẩu xong
export const notifyPasswordReseted = async (email, date_reset) => {
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Dr.MediPro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: "MẬT KHẨU CỦA BẠN ĐÃ ĐƯỢC THAY ĐỔI",
    html: /*html*/ `
    <div>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn đã thay đổi mật khẩu đăng nhập của mình lúc <span style="color: #f5a742;">${date_reset}</span>.</p>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Giờ đây, bạn có thể sử dụng mật khẩu mới để đăng nhập vào hệ thống <span style="color: #48A800;">Dr.MediPro</span>.</p>
    <div><img src="https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png" alt="MediPro Logo" style="margin-top: 50px"/></div>
    </div>
    `,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Gửi mail với transporter đã được config xong
  const info = await transporter.sendMail(mailOptions);
  if (!info) {
    return res.status(400).json({
      message: "An error occurred while sending the email!",
    });
  }

  console.log("Send mail to generate verify token succeed!");
};
