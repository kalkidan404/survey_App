import express from "express"
const route=express.Router();
import  {
  createSurvey,
  getMySurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
} from "../controller/surveyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
route.post("/",authMiddleware, createSurvey);
route.get("/",authMiddleware, getMySurveys);
route.get("/:id", getSurveyById);
route.put("/:id",authMiddleware, updateSurvey);
route.delete("/:id",authMiddleware, deleteSurvey);
export{route}