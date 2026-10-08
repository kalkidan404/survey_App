import express from "express";

const route = express.Router();

import {
  addAnswer,
  getAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controller/answerController.js";
import authMiddleware from "../middleware/authMiddleware.js";
route.post("/response/:responseId",authMiddleware, addAnswer);

route.get("/:id",authMiddleware, getAnswer);

route.put("/:id",authMiddleware, updateAnswer);

route.delete("/:id",authMiddleware, deleteAnswer);

export { route };