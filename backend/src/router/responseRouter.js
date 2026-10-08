import express from "express";

const route = express.Router();

import {
  createResponse,
  getMyResponses,
  getResponseById,
  deleteResponse,
} from "../controller/responseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

route.post("/survey/:surveyId",authMiddleware, createResponse);

route.get("/",authMiddleware, getMyResponses);

route.get("/:id",authMiddleware, getResponseById);

route.delete("/:id",authMiddleware, deleteResponse);

export { route };