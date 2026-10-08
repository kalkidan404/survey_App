import express from "express"
const route=express.Router()

import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controller/questionController.js"
import authMiddleware from "../middleware/authMiddleware.js"
route.post("/",authMiddleware, addQuestion)
route.put("/:id",authMiddleware, updateQuestion)
route.delete("/:id",authMiddleware, deleteQuestion)
export{route}