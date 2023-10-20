import express from "express";

import { verifyToken } from "../config/verifyUser.js";
import {
  createList,
  deleteList,
  updateList,
  getList,
  searchLists,
} from "../controllers/listController.js";

const listRoute = express.Router();

listRoute.post("/create", verifyToken, createList);
listRoute.delete("/delete/:id", verifyToken, deleteList);
listRoute.post("/update/:id", verifyToken, updateList);
listRoute.get("/get/:id", getList);
listRoute.get("/search", searchLists);

export { listRoute };
