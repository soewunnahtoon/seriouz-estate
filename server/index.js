import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import { connectDB } from "./config/connectDB.js";
import { userRoute } from "./routes/userRoute.js";
import { authRoute } from "./routes/authRoute.js";
import { listRoute } from "./routes/listRoute.js";

connectDB()
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/list", listRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
  });
});
