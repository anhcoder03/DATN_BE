import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendNotifyMail = async (email, date_booking, subject) => {
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Medipro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: subject,
    html: /*html*/ `
    <div>
    <p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn đã đặt lịch khám tại <span style="color: #48A800; ">Phòng Khám MediPro</span> vào <span style="color: #f5a742">${date_booking}</span>. Mời bạn đến phòng khám của chúng tôi đúng hẹn để khám bệnh.</p>
    <p  style="font-size: 16px; color: #002140; font-weight: 600;">Cảm ơn bạn vì đã lựa chọn MediPro!</p>
    <img src="https://res.cloudinary.com/mediapro-cloud/image/upload/v1700236522/mediaPro-DATN/logo3_j43xpj.png" alt="Medipro Logo" style="margin-top: 30px"/>
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

  console.log("Send mail succeed!");
};
export default sendNotifyMail;
