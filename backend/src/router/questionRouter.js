import express from "express"
const route=express.Router()

import {
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../controller/questionController.js"
route.post("/", addQuestion)
route.put("/:id", updateQuestion)
route.delete("/:id", deleteQuestion)
export{route}