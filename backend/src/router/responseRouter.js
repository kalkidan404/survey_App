import express from "express";

const route = express.Router();

import {
  createResponse,
  getMyResponses,
  getResponseById,
  deleteResponse,
  getSurveyResponses
} from "../controller/responseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
route.get("/:surveyId/responses", authMiddleware, getSurveyResponses);
route.post("/survey/:surveyId",authMiddleware, createResponse);

route.get("/",authMiddleware, getMyResponses);

route.get("/:id",authMiddleware, getResponseById);

route.delete("/:id",authMiddleware, deleteResponse);

export { route };