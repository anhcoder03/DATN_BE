import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
dotenv.config();
const app = express();
app.use(express.json());
dotenv.config();

//connect to MongoDB
connectDB(process.env.MONGODB_URL);
// middleware

//app listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
