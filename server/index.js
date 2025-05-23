import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import partnerRoutes from "./routes/partners.js";
import templateRoutes from "./routes/templates.js";
import promotionRoutes from "./routes/promotions.js";
import dashboardRoutes from "./routes/dashboard.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Promotion Template Builder API is running");
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/promo-builder")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection:", error);
});
