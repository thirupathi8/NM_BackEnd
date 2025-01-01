import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/addUser.js";
import pdfRoute from "./routes/pdfUpload.js";
import qaRoute from "./routes/quesUpload.js";

// const PORT = 3000;

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://notemaker-7m7w4e4w8-thirupathi8s-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
// app.use(cors());

app.use(express.json());

app.use("/user", userRoute);
app.use("/pdf", pdfRoute);
app.use("/qa", qaRoute);

mongoose.connect(process.env.MONGODB_ATLAS_URI).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.error(err);
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
