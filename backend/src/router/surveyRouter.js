import express from "express"
const route=express.Router();
import  {
  createSurvey,
  getMySurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
} from "../controller/surveyController.js";
route.post("/", createSurvey);
route.get("/", getMySurveys);
route.get("/:id", getSurveyById);
route.put("/:id", updateSurvey);
route.delete("/:id", deleteSurvey);
export{route}