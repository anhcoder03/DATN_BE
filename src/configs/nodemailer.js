import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default main = ({ email, date_booking, subject }) => {
  // Tạo nội dung của mail
  const mailOptions = {
    from: `Phòng Khám Medipro ${process.env.EMAIL_SENDER}`,
    to: email,
    subject: subject,
    html: `<p style="font-size: 16px; color: #002140; font-weight: 600;">Bạn đã đặt lịch khám tại Phòng Khám MediPro vào ${date_booking}. Mời bạn đến khám của chúng tôi đúng hẹn để khám bệnh.</p>
    <p  style="font-size: 16px; color: #48A800; font-weight: 600;">Cảm ơn bạn vì đã lựa chọn MediPro</p>
    `,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
  });
};
