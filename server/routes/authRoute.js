import express from "express";

import {
  signup,
  signin,
  google,
  signout,
} from "../controllers/authController.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);
authRoute.post("/google", google);
authRoute.get("/signout", signout);

export { authRoute };
