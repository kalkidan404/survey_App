import express from "express";

const route = express.Router();

import {
  addOption,
  updateOption,
  deleteOption,
  getOptions,
} from "../controller/optionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

route.post("/question/:questionId",authMiddleware, addOption);

route.get("/question/:questionId",authMiddleware, getOptions);

route.put("/:id",authMiddleware, updateOption);

route.delete("/:id",authMiddleware, deleteOption);

export { route };