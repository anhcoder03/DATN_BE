import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "node:http";
import connectDB from "./configs/database.js";
import { socketIo } from "./configs/soketio.js";
import cookieParser from "cookie-parser";

import categoryRouter from "./Routes/Category.js";
import medicineRouter from "./Routes/Medicine.js";
import customerRouter from "./Routes/Customer.js";
import roleRouter from "./Routes/Role.js";
import userRouter from "./Routes/User.js";
import serviceRouter from "./Routes/Service.js";
import clinicRouter from "./Routes/Clinics.js";
import serviceByExamination from "./Routes/ServiceByExamination.js";
import medicalExaminationSlipRouter from "./Routes/MedicalExaminationSlip.js";
import medicalExaminationInvoiceRouter from "./Routes/MedicalExaminationInvoice.js";
import prescriptionRouter from "./Routes/Prescription.js";
import statisticRouter from "./Routes/Statistic.js";

import uploadImageRouter from "./Routes/UploadImage.js";
import orderRouter from "./Routes/Order.js";
import notifyTokenRouter from "./Routes/NotifyToken.js";
import notificationRouter from "./Routes/Notification.js";
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
const server = createServer(app);

dotenv.config();
app.use(uploadImageRouter);
app.use(categoryRouter);
app.use(medicineRouter);
app.use(roleRouter);
app.use(customerRouter);
app.use(userRouter);
app.use(serviceRouter);
app.use(clinicRouter);
app.use(medicalExaminationSlipRouter);
app.use(medicalExaminationInvoiceRouter);
app.use(prescriptionRouter);
app.use(serviceByExamination);
app.use(orderRouter);
app.use(notifyTokenRouter);
app.use(notificationRouter);
app.use(statisticRouter);
//connect to MongoDB
connectDB(process.env.MONGODB_URL);
// middleware

//app listen
socketIo(server);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
