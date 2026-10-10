
import express from "express";

import {
  createSurvey,
  getMySurveys,
  getRecentSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
} from "../controller/surveyController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const route = express.Router();

// Create a survey
route.post("/", authMiddleware, createSurvey);

// Get all surveys belonging to the logged-in user
route.get("/", authMiddleware, getMySurveys);

// Get the six most recent surveys
route.get("/recent", authMiddleware, getRecentSurveys);

// Get one of the logged-in user's surveys
route.get("/:id", authMiddleware, getSurveyById);

// Update a survey
route.put("/:id", authMiddleware, updateSurvey);

// Delete a survey
route.delete("/:id", authMiddleware, deleteSurvey);

export { route };
