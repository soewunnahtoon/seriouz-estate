import express from "express";

import { verifyToken } from "../config/verifyUser.js";
import {
  updateUser,
  deleteUser,
  getUserList,
  getUser,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/update/:id", verifyToken, updateUser);
userRoute.delete("/delete/:id", verifyToken, deleteUser);
userRoute.get("/lists/:id", verifyToken, getUserList);
userRoute.get("/:id", verifyToken, getUser);

export { userRoute };
