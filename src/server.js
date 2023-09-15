import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Configs/database.js";

import categoryRouter from "./Routes/Category.js";
import medicineRouter from "./Routes/Medicine.js";
import customerRouter from "./Routes/Customer.js";
import roleRouter from "./Routes/Role.js";
dotenv.config();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

dotenv.config();
app.use(categoryRouter);
app.use(medicineRouter);
app.use(roleRouter);
app.use(customerRouter);
//connect to MongoDB
connectDB(process.env.MONGODB_URL);
// middleware

//app listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
