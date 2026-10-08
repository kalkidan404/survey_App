import express from "express";

const route = express.Router();

import {
  addOption,
  updateOption,
  deleteOption,
  getOptions,
} from "../controller/optionController.js";

route.post("/question/:questionId", addOption);

route.get("/question/:questionId", getOptions);

route.put("/:id", updateOption);

route.delete("/:id", deleteOption);

export { route };