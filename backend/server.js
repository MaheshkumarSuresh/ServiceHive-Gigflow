import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import bidRoutes from "./routes/bidRoutes.js";

dotenv.config();

const app = express();

/* -------------------- Middleware -------------------- */
app.use(express.json());
app.use(cookieParser());

// Allow both local + production frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://service-hive-gigflow.vercel.app/"
    ],
    credentials: true
  })
);

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("GigFlow API running");
});

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });
